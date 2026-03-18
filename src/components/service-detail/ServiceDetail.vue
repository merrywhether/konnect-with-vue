<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CoreBox, CoreText } from '#core'
import { SkeletonText } from '#common'
import { BaseModal } from '#modals'
import type { Service } from '#types'
import { useServicesStore, getServiceStatus } from '@/stores/services'
import ErrorState from '../ErrorState.vue'
import StatusBadge from '../StatusBadge.vue'
import VersionRow from './VersionRow.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const route = useRoute()
const store = useServicesStore()
const service = ref<Service | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const status = computed(() =>
  service.value ? getServiceStatus(service.value) : null,
)

function handleClose() {
  router.push({ name: 'services', query: route.query })
}

async function loadService() {
  loading.value = true
  error.value = null

  if (store.state.status === 'success') {
    const found = store.state.data.find((s) => s.id === props.id)
    if (found) {
      service.value = found
      loading.value = false
      return
    }
  }

  try {
    const response = await fetch(`/api/services/${props.id}`)
    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(body?.error ?? `HTTP ${response.status}`)
    }
    service.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(loadService)
</script>

<template>
  <BaseModal
    labelled-by="service-detail-title"
    :open="true"
    width="830px"
    @close="handleClose"
  >
    <template #title>
      <SkeletonText
        v-if="loading"
        size="lg"
        width="40%"
      />
      <CoreBox
        v-else-if="service"
        align="flex-start"
        display="flex"
        gap="md"
        justify="space-between"
      >
        <CoreText
          id="service-detail-title"
          as="h2"
          color="textSecondaryStrong"
          size="lg"
          weight="bold"
        >
          {{ service.name }}
        </CoreText>
        <StatusBadge
          v-if="status !== 'published'"
          :status="status!"
        />
      </CoreBox>
    </template>

    <ErrorState
      v-if="error"
      @retry="loadService"
    />

    <CoreBox
      v-else-if="loading"
      direction="column"
      display="flex"
      gap="xl"
    >
      <SkeletonText
        size="base"
        width="15%"
      />

      <CoreBox
        v-for="n in 3"
        :key="n"
        direction="column"
        display="flex"
        gap="xs"
      >
        <SkeletonText
          size="sm"
          width="7%"
        />
        <SkeletonText size="sm" />
      </CoreBox>
    </CoreBox>

    <template v-else-if="service">
      <CoreBox
        v-if="status === 'in-progress'"
        align="center"
        class="empty-detail"
        direction="column"
        display="flex"
        gap="sm"
        text-align="center"
      >
        <CoreText
          as="p"
          color="textPrimary"
          size="base"
          weight="semibold"
        >
          This service is in progress
        </CoreText>
        <CoreText
          as="p"
          color="textSecondary"
          size="sm"
        >
          Configure this {{ service.type }} service to continue.
        </CoreText>
      </CoreBox>

      <template v-else>
        <CoreBox
          v-if="status === 'unpublished'"
          class="unpublished-banner"
          direction="column"
          display="flex"
          gap="xs"
          text-align="center"
        >
          <CoreText
            as="p"
            color="textPrimary"
            size="base"
            weight="semibold"
          >
            This {{ service.type }} service hasn't been published
            yet
          </CoreText>
          <CoreText
            v-if="service.versions.length === 0"
            as="p"
            color="textSecondary"
            size="sm"
          >
            Add a version to get started.
          </CoreText>
        </CoreBox>

        <template v-if="service.versions.length > 0">
          <CoreText
            as="h3"
            class="detail-heading"
            color="textSecondaryStrong"
            size="md"
            weight="semibold"
          >
            Versions ({{ service.versions.length }})
          </CoreText>

          <VersionRow
            v-for="version in service.versions"
            :key="version.id"
            :service-type="service.type"
            :version="version"
          />
        </template>
      </template>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.detail-heading {
    margin-bottom: 20px;
}

.empty-detail {
    padding: var(--spacing-lg) 0 var(--spacing-xl);
}

.unpublished-banner {
    padding: var(--spacing-base) 0 20px;
}

@media (max-width: $bp-sm) {
    .empty-detail {
        flex: 1;
        gap: var(--spacing-xs);
        justify-content: center;
        padding: 0;
    }

    .unpublished-banner {
        padding: var(--spacing-md) 0 var(--spacing-base);
    }
}
</style>
