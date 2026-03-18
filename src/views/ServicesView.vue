<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DevSettingsModal from '@/components/DevSettingsModal.vue'
import NavBar from '@/components/nav/NavBar.vue'
import CreateServiceModal from '@/components/create-service/CreateServiceModal.vue'
import ServiceCatalog from '@/components/services-catalog/ServiceCatalog.vue'
import { useServicesStore } from '@/stores/services'

const route = useRoute()
const router = useRouter()
const store = useServicesStore()

const showCreateModal = ref(false)
const showDevSettings = ref(false)

const searchQuery = ref(String(route.query.q || ''))
const currentPage = computed(() => Number(route.query.page || 1))

let searchTimeout: ReturnType<typeof setTimeout>

function onSearchUpdate(val: string, opts?: { immediate?: boolean }) {
  searchQuery.value = val
  clearTimeout(searchTimeout)

  const pushRoute = () => {
    router.push({
      query: {
        ...route.query,
        q: val || undefined,
        page: undefined,
      },
    })
  }

  if (opts?.immediate) {
    pushRoute()
  } else {
    searchTimeout = setTimeout(pushRoute, 300)
  }
}

function onPageChange(page: number) {
  router
    .push({
      query: {
        ...route.query,
        page: page > 1 ? String(page) : undefined,
      },
    })
    .then(() => {
      nextTick(() => {
        window.scrollTo(0, 0)
      })
    })
    .catch(() => {})
}

const pendingServiceId = ref<string | null>(null)

function onServiceCreated(id: string) {
  pendingServiceId.value = id
  showCreateModal.value = false
}

function onCreateModalAfterLeave() {
  if (pendingServiceId.value) {
    router.push({ path: `/services/${pendingServiceId.value}`, query: route.query })
    pendingServiceId.value = null
  }
}

// Track last-fetched values so we skip redundant fetches
// (e.g. navigating to/from a child route with the same query)
const lastFetchedQ = ref<string | null>(null)
const lastFetchedPage = ref<number | null>(null)

watch(
  () => [route.query.q, route.query.page] as const,
  ([q, page]) => {
    const normalQ = String(q || '')
    const normalPage = Number(page || 1)

    searchQuery.value = normalQ

    if (
      normalQ === lastFetchedQ.value &&
            normalPage === lastFetchedPage.value
    ) {
      return
    }

    lastFetchedQ.value = normalQ
    lastFetchedPage.value = normalPage
    store.fetchServices(normalQ, normalPage)
  },
  { immediate: true },
)
</script>

<template>
  <div class="app-layout">
    <NavBar @settings="showDevSettings = true" />
    <main class="main-content">
      <ServiceCatalog
        :page="currentPage"
        :search-query="searchQuery"
        :state="store.state"
        @clear-search="onSearchUpdate('', { immediate: true })"
        @create-service="showCreateModal = true"
        @retry="
          store.fetchServices(
            String(route.query.q || ''),
            currentPage,
          )
        "
        @update:page="onPageChange"
        @update:search-query="onSearchUpdate"
      />
    </main>

    <RouterView />

    <CreateServiceModal
      :open="showCreateModal"
      @after-leave="onCreateModalAfterLeave"
      @close="showCreateModal = false"
      @created="onServiceCreated($event)"
    />

    <DevSettingsModal
      :open="showDevSettings"
      @close="showDevSettings = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    margin: 0 auto;
    max-width: 1440px;
    padding: var(--spacing-2xl);
    width: 100%;
}

@media (max-width: $bp-sm) {
    .main-content {
        padding: var(--spacing-lg);
    }
}
</style>
