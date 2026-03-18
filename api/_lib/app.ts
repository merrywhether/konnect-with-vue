import { faker } from '@faker-js/faker'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import response, { generateVersions } from './data.ts'
import type {
  CreateServicePayload,
  ErrorResponse,
  Service,
  ServicesResponse,
} from './types.ts'

export interface DevSettings {
  slow: boolean
  err: boolean
}

export default function createApp(): Hono {
  const app = new Hono()

  app.use(cors())
  app.use(async (c, next) => {
    await next()
    c.res.headers.set('Cache-Control', 'no-store')
  })

  // Debug middleware (dev only, reads mutable state per-request)
  const isDev = process.env.NODE_ENV !== 'production'

  const devSettings: DevSettings = {
    slow: false,
    err: false,
  }

  let errRequestCount = 0

  if (isDev) {
    const MIN_DELAY = 800
    const MAX_DELAY = 2500

    app.use(async (c, next) => {
      if (!devSettings.slow || c.req.path.startsWith('/api/__dev')) return next()

      const delay =
        Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY
      await new Promise((resolve) => setTimeout(resolve, delay))
      return next()
    })

    app.use(async (c, next) => {
      if (!devSettings.err || c.req.path.startsWith('/api/__dev')) return next()

      errRequestCount++
      if (errRequestCount % 2 === 0) {
        return c.json<ErrorResponse>({ error: 'Simulated server error (err mode)' }, 500)
      }
      return next()
    })
  }

  if (isDev) {
    app.get('/api/__dev/settings', (c) => {
      return c.json<DevSettings>(devSettings, 200)
    })

    app.put('/api/__dev/settings', async (c) => {
      const body = await c.req.json<Partial<DevSettings>>()
      if (typeof body.slow === 'boolean') {
        devSettings.slow = body.slow
      }
      if (typeof body.err === 'boolean') {
        devSettings.err = body.err
      }
      return c.json<DevSettings>(devSettings, 200)
    })
  }

  app.get('/api/services/:id', (c) => {
    const id = c.req.param('id')
    const service = response.services.find((s: Service) => s.id === id)

    if (!service) {
      return c.json<ErrorResponse>({ error: 'Not found' }, 404)
    }

    return c.json<Service>(service, 200)
  })

  app.post('/api/services', async (c) => {
    const {
      name,
      description,
      type,
      configured: configuredReq,
      published: publishedReq,
    } = await c.req.json<CreateServicePayload>()

    if (!name) {
      return c.json<ErrorResponse>({ error: 'Name is required' }, 400)
    }

    // Resolve configured/published, enforcing the invariant: published requires configured
    const configuredRaw =
      typeof configuredReq === 'boolean'
        ? configuredReq
        : Math.random() < 0.75
    const publishedRaw =
      typeof publishedReq === 'boolean'
        ? publishedReq
        : configuredRaw && Math.random() < 0.5
    const configured = publishedRaw ? true : configuredRaw
    const published = configured ? publishedRaw : false

    const newService: Service = {
      id: faker.string.uuid(),
      name,
      description: description || '',
      type: type || 'REST',
      published,
      configured,
      versions: generateVersions(configured, published),
      metrics: configured
        ? {
          latency: faker.number.float({
            min: 0.3,
            max: 0.99,
            multipleOf: 0.01,
          }),
          uptime: faker.number.float({
            min: 0.895,
            max: 0.998,
            multipleOf: 0.0001,
          }),
          requests: faker.number.int({ min: 800, max: 1500000 }),
          errors: faker.number.float({
            min: 0.001,
            max: 0.089,
            multipleOf: 0.0001,
          }),
        }
        : undefined,
    }

    response.services.unshift(newService)

    return c.json<Service>(newService, 201)
  })

  app.get('/api/:entity', (c) => {
    const entity = c.req.param('entity')
    const data: Array<Record<string, any>> = (
      response as Record<string, any>
    )[entity]

    if (!data) {
      return c.json<ErrorResponse>({ error: 'Not found' }, 404)
    }

    const query: string = String(c.req.query('q') || '')
      .trim()
      .toLowerCase()
    const itemContainsFilter = (str: string) =>
      String(str || '')
        .toLowerCase()
        .includes(query) || false

    let filteredData: Array<Record<string, any>>

    if (!query) {
      filteredData = data
    } else {
      if (entity === 'services') {
        // For services, only match against name, description, and type fields
        filteredData = data.filter((responseData: Record<string, any>) => {
          return (
            itemContainsFilter(responseData.name) ||
            itemContainsFilter(responseData.description) ||
            itemContainsFilter(responseData.type)
          )
        })
      } else {
        // Filter the response data if a filter query string is present
        filteredData = data.filter((responseData: Record<string, any>) => {
          for (const property in responseData) {
            // Only allow searching when the object property is typeof `string`
            // If string is found, return true
            if (
              responseData[property] &&
              typeof responseData[property] === 'string' &&
              itemContainsFilter(responseData[property])
            ) {
              return true
            }
          }
          return false
        })
      }
    }

    if (entity === 'services') {
      const page = Math.max(1, parseInt(String(c.req.query('page')), 10) || 1)
      const limit = Math.min(
        100,
        Math.max(1, parseInt(String(c.req.query('limit')), 10) || 12),
      )
      const total = filteredData.length
      const start = (page - 1) * limit
      const end = page * limit
      const paginatedData = filteredData.slice(start, end)

      const serviceResponse: ServicesResponse = {
        data: paginatedData as Service[],
        total,
        page,
        limit,
      }
      return c.json<ServicesResponse>(serviceResponse, 200)
    }

    return c.json<Service[]>(filteredData as Service[], 200)
  })

  app.all('*', (c) => {
    return c.json<ErrorResponse>({ error: 'Not found' }, 404)
  })

  return app
}
