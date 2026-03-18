<script lang="ts" setup>
import { CoreBox, CoreText } from '#core'
import { CheckIcon, SpinnerIcon, DisabledIcon } from '#icons'
import type { ColorKey } from '#theme'
import type { ServiceStatus } from '@/stores/services'

defineProps<{
  status: ServiceStatus
}>()

const config: Record<
  ServiceStatus,
  { label: string, iconColor: ColorKey, icon: unknown }
> = {
  published: {
    label: 'Published to portal',
    iconColor: 'statusSuccess',
    icon: CheckIcon,
  },
  unpublished: {
    label: 'Unpublished',
    iconColor: 'statusNeutral',
    icon: DisabledIcon,
  },
  'in-progress': {
    label: 'In progress',
    iconColor: 'statusWarning',
    icon: SpinnerIcon,
  },
}
</script>

<template>
  <CoreBox
    align="center"
    class="status-badge"
    display="flex"
    gap="sm"
  >
    <component
      :is="config[status].icon"
      :color="config[status].iconColor"
    />
    <CoreText
      color="textPrimaryMuted"
      size="xs"
    >
      {{ config[status].label }}
    </CoreText>
  </CoreBox>
</template>

<style lang="scss" scoped>
.status-badge {
    white-space: nowrap;
}
</style>
