import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ServicesResponse, CreateServicePayload, Service } from '#types'

export { type Service }

export type ServiceStatus = 'published' | 'unpublished' | 'in-progress'

export type ServiceState =
  | { status: 'loading' }
  | { status: 'success', data: Service[], total: number }
  | { status: 'error', error: Error }

export function getServiceStatus(service: Service): ServiceStatus {
  if (service.published) return 'published'
  if (service.configured) return 'unpublished'
  return 'in-progress'
}

export const PAGE_SIZE = 12

/** How long to keep showing stale results before falling back to skeletons */
const STALE_GRACE_MS = 100

export const useServicesStore = defineStore('services', () => {
  const state = ref<ServiceState>({ status: 'loading' })
  let controller: AbortController | null = null
  let staleTimer: ReturnType<typeof setTimeout> | null = null

  async function fetchServices(query: string, page: number) {
    controller?.abort()
    controller = new AbortController()

    if (staleTimer !== null) {
      clearTimeout(staleTimer)
      staleTimer = null
    }

    // If we already have data on screen, give the fetch a short grace period
    // before showing skeletons. Fast responses will swap cards directly
    // (enabling the TransitionGroup slide/fade), slow responses will fall
    // back to the skeleton grid after the grace period.
    if (state.value.status === 'success') {
      staleTimer = setTimeout(() => {
        staleTimer = null
        state.value = { status: 'loading' }
      }, STALE_GRACE_MS)
    } else {
      state.value = { status: 'loading' }
    }

    try {
      const params = new URLSearchParams({
        ...(query && { q: query }),
        page: String(page),
        limit: String(PAGE_SIZE),
      })

      const response = await fetch(`/api/services?${params}`, {
        signal: controller.signal,
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(
          body?.error ?? `HTTP ${response.status}: ${response.statusText}`,
        )
      }

      const json = await response.json()
      const data: ServicesResponse = Array.isArray(json)
        ? { data: json, total: json.length, page: 1, limit: json.length }
        : json

      if (staleTimer !== null) {
        clearTimeout(staleTimer)
        staleTimer = null
      }

      state.value = { status: 'success', data: data.data, total: data.total }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return

      if (staleTimer !== null) {
        clearTimeout(staleTimer)
        staleTimer = null
      }

      state.value = {
        status: 'error',
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  }

  async function createService(
    payload: CreateServicePayload,
  ): Promise<Service> {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(
        body?.error ?? `HTTP ${response.status}: ${response.statusText}`,
      )
    }

    return response.json()
  }

  return { state, fetchServices, createService }
})
