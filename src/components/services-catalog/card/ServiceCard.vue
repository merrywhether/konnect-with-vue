<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { VersionBadge, BaseCard } from '#common'
import { CoreBox, CoreText } from '#core'
import type { Service, Developer, Version } from '#types'
import { getServiceStatus } from '@/stores/services'
import StatusBadge from '../../StatusBadge.vue'
import AvatarStack from './AvatarStack.vue'
import ServiceMetrics from './ServiceMetrics.vue'

const props = defineProps<{
  service: Service
}>()

const router = useRouter()

const status = computed(() => getServiceStatus(props.service))

const uniqueDevelopers = computed(() => {
  const seen = new Set<string>()
  return props.service.versions
    .filter((v): v is Version & { developer: Developer } => !!v.developer)
    .map((v) => v.developer)
    .filter((d) => {
      if (seen.has(d.id)) return false
      seen.add(d.id)
      return true
    })
})

function handleClick() {
  router.push({
    path: `/services/${props.service.id}`,
    query: router.currentRoute.value.query,
  })
}
</script>

<template>
  <BaseCard
    as="article"
    class="service-card"
    interactive
    @click="handleClick"
  >
    <template #header>
      <CoreBox
        align="flex-start"
        display="flex"
        justify="space-between"
      >
        <StatusBadge :status="status" />
        <VersionBadge
          v-if="service.versions.length"
          :count="service.versions.length"
        />
      </CoreBox>
    </template>

    <CoreBox
      direction="column"
      display="flex"
      gap="sm"
    >
      <CoreText
        as="h3"
        class="title"
        size="lg"
        weight="semibold"
      >
        {{ service.name }}
      </CoreText>
      <CoreText
        v-if="service.description"
        as="p"
        color="textSecondary"
        size="sm"
      >
        {{ service.description }}
      </CoreText>
    </CoreBox>

    <template #footer>
      <CoreBox
        align="flex-end"
        display="flex"
        justify="space-between"
      >
        <ServiceMetrics :service="service" />

        <AvatarStack
          v-if="uniqueDevelopers.length"
          class="avatars"
          :developers="uniqueDevelopers"
        />
      </CoreBox>
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped>
.service-card {
    min-height: 232px;
}

.title {
    word-break: break-word;
}

.avatars {
    flex-shrink: 0;
}
</style>
