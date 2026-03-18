import { faker } from '@faker-js/faker'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import type { Request, Response } from 'express'
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

export default function createApp(): Express {
  const app: Express = express()

  app.use(cors())
  app.use(bodyParser.json())

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

    app.use((req, _res, next) => {
      if (!devSettings.slow || req.path.startsWith('/api/__dev')) return next()

      const delay =
        Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY
      setTimeout(next, delay)
    })

    app.use((req, res, next) => {
      if (!devSettings.err || req.path.startsWith('/api/__dev')) return next()

      errRequestCount++
      if (errRequestCount % 2 === 0) {
        return res
          .status(500)
          .json({ error: 'Simulated server error (err mode)' })
      }
      next()
    })
  }

  if (isDev) {
    app
      .route('/api/__dev/settings')
      .get((_req: Request, res: Response<DevSettings>) => {
        return res.status(200).json(devSettings)
      })
      .put(
        (
          req: Request<
            Record<string, string>,
            DevSettings,
            Partial<DevSettings>
          >,
          res: Response<DevSettings>,
        ) => {
          if (typeof req.body.slow === 'boolean') {
            devSettings.slow = req.body.slow
          }
          if (typeof req.body.err === 'boolean') {
            devSettings.err = req.body.err
          }
          return res.status(200).json(devSettings)
        },
      )
  }

  app
    .route('/api/services/:id')
    .get(
      (
        req: Request<{ id: string }>,
        res: Response<Service | ErrorResponse>,
      ) => {
        const { id } = req.params
        const service = response.services.find((s: Service) => s.id === id)

        if (!service) {
          return res.status(404).json({ error: 'Not found' })
        }

        return res.status(200).json(service)
      },
    )

  app
    .route('/api/services')
    .post(
      (
        req: Request<
          Record<string, string>,
          Service | ErrorResponse,
          CreateServicePayload
        >,
        res: Response<Service | ErrorResponse>,
      ) => {
        const {
          name,
          description,
          type,
          configured: configuredReq,
          published: publishedReq,
        } = req.body

        if (!name) {
          return res.status(400).json({ error: 'Name is required' })
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

        return res.status(201).json(newService)
      },
    )

  app
    .route('/api/:entity')
    .get(
      (
        req: Request<{ entity: string }>,
        res: Response<ServicesResponse | Service[] | ErrorResponse>,
      ) => {
        const { entity } = req.params
        const data: Array<Record<string, any>> = (
          response as Record<string, any>
        )[entity]

        if (!data) {
          return res.status(404).json({ error: 'Not found' })
        }

        const query: string = String(req.query.q || '')
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
          const page = Math.max(1, parseInt(String(req.query.page), 10) || 1)
          const limit = Math.min(
            100,
            Math.max(1, parseInt(String(req.query.limit), 10) || 12),
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
          return res.status(200).send(serviceResponse)
        }

        return res.status(200).json(filteredData as Service[])
      },
    )

  app.route('*').get((_req: Request, res: Response<ErrorResponse>) => {
    res.status(404).json({ error: 'Not found' })
  })

  return app
}
