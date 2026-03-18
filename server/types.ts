export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Version {
  id: string
  name: string
  description: string
  developer?: Developer
  updated_at: string
}

export interface Metrics {
  latency: number
  uptime: number
  requests: number
  errors: number
}

export type ServiceType = 'REST' | 'HTTP'

export interface Service {
  id: string
  name: string
  description: string
  type: ServiceType
  published: boolean
  configured: boolean
  versions: Version[]
  metrics?: Metrics
}

export interface ServicesResponse {
  data: Service[]
  total: number
  page: number
  limit: number
}

export interface CreateServicePayload {
  name: string
  description: string
  type: ServiceType
  configured?: boolean
  published?: boolean
}

export interface ErrorResponse {
  error: string
}