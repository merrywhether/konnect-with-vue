<script lang="ts" setup>
import { ref, watch } from 'vue'
import { SearchInput } from '#common'
import { CoreBox, CoreText } from '#core'
import { PAGE_SIZE, type ServiceState } from '@/stores/services'
import CreateServiceButton from '../create-service/CreateServiceButton.vue'
import ErrorState from '../ErrorState.vue'
import ServiceCard from './card/ServiceCard.vue'
import SkeletonCard from './card/SkeletonCard.vue'
import EmptyState from './EmptyState.vue'
import PaginationControls from './PaginationControls.vue'

const props = defineProps<{
  state: ServiceState
  searchQuery: string
  page: number
}>()

const cachedTotal = ref(0)
watch(
  () => props.state,
  (state) => {
    if (state.status === 'success') cachedTotal.value = state.total
  },
  { immediate: true },
)

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:page': [value: number]
  'create-service': []
  'clear-search': []
  retry: []
}>()
</script>

<template>
  <div class="service-catalog">
    <CoreBox
      align="flex-start"
      class="catalog-header"
      display="flex"
      justify="space-between"
    >
      <CoreBox
        direction="column"
        display="flex"
        gap="sm"
      >
        <CoreText
          as="h1"
          size="xl"
          weight="bold"
        >
          Service Hub
        </CoreText>
        <CoreText
          as="p"
          color="textPrimary"
          size="md"
        >
          Organize services, manage and track versioning and API
          service documentation.
          <a href="#">Learn more</a>
        </CoreText>
      </CoreBox>

      <CoreBox
        align="center"
        class="catalog-actions"
        display="flex"
        gap="md"
      >
        <SearchInput
          :model-value="searchQuery"
          @clear="emit('clear-search')"
          @update:model-value="emit('update:searchQuery', $event)"
        />
        <CreateServiceButton @create-service="emit('create-service')" />
      </CoreBox>
    </CoreBox>

    <div
      v-if="state.status === 'loading'"
      class="card-grid"
    >
      <SkeletonCard
        v-for="i in PAGE_SIZE"
        :key="'skeleton-' + i"
      />
    </div>

    <TransitionGroup
      v-else-if="state.status === 'success' && state.data.length > 0"
      appear
      class="card-grid"
      name="card"
      tag="div"
    >
      <ServiceCard
        v-for="(service, index) in state.data"
        :key="service.id"
        :service="service"
        :style="{ '--card-index': index }"
      />
    </TransitionGroup>

    <EmptyState
      v-else-if="state.status === 'success' && state.data.length === 0"
      :mode="searchQuery ? 'no-results' : 'empty'"
      :query="searchQuery"
      @clear="emit('clear-search')"
      @create-service="emit('create-service')"
    />

    <ErrorState
      v-else-if="state.status === 'error'"
      @retry="emit('retry')"
    />

    <PaginationControls
      v-if="cachedTotal > 0 && state.status !== 'error'"
      :page="page"
      :page-size="PAGE_SIZE"
      :total="cachedTotal"
      @update:page="emit('update:page', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.service-catalog {
    margin: 0 auto;
    max-width: 100%;
}

.catalog-header {
    margin-bottom: var(--spacing-2xl);
}

.catalog-actions {
    flex-shrink: 0;
}

.card-grid {
    display: grid;
    gap: var(--spacing-2xl);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    position: relative;
}

/* Cards: phase 1 fade-out (0–100ms), phase 2 slide (100–300ms), phase 3 fade-in (300ms+) */
.card-enter-active {
    transition: opacity 0.2s ease;
    transition-delay: calc(0.3s + var(--card-index, 0) * 30ms);
}

.card-leave-active {
    position: absolute;
    transition: opacity 0.1s ease;
    width: calc((100% - 2 * var(--spacing-2xl)) / 3);
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
}

.card-move {
    transition: transform 0.2s ease-out 0.1s;
}

@media (max-width: $bp-lg) {
    .card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card-leave-active {
        width: calc((100% - var(--spacing-2xl)) / 2);
    }
}

@media (max-width: $bp-md) {
    .catalog-actions {
        align-self: stretch;
        flex-direction: column-reverse;
        justify-content: space-between;

        > * {
            width: 100%;
        }
    }
}

@media (max-width: $bp-sm) {
    .catalog-header {
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .catalog-actions {
        width: 100%;
    }

    .card-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .card-leave-active {
        width: 100%;
    }
}
</style>
