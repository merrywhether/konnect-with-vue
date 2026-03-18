<script lang="ts" setup>
import { StatusIcon } from '#icons'
import { CoreBox, CoreText } from '#core'
import type { Service } from '#types'
import {
  formatLatency,
  formatUptime,
  formatRequests,
  formatErrors,
} from './formatters'

defineProps<{
  service: Service
}>()
</script>

<template>
  <CoreBox
    v-if="service.configured && service.metrics"
    direction="column"
    display="flex"
    gap="xs"
  >
    <CoreBox
      align="center"
      display="flex"
      gap="6px"
    >
      <StatusIcon
        class="metric-dot"
        color="statusHealthy"
      />
      <CoreText
        as="span"
        color="textPrimary"
        size="xs"
        weight="semibold"
      >
        {{ formatLatency(service.metrics.latency) }}
      </CoreText>
      <CoreText
        as="span"
        color="textPrimaryMuted"
        size="xs"
      >
        latency
      </CoreText>
    </CoreBox>
    <CoreBox
      align="center"
      display="flex"
      gap="6px"
    >
      <StatusIcon
        class="metric-dot"
        color="statusHealthy"
      />
      <CoreText
        as="span"
        color="textPrimary"
        size="xs"
        weight="semibold"
      >
        {{ formatUptime(service.metrics.uptime) }}
      </CoreText>
      <CoreText
        as="span"
        color="textPrimaryMuted"
        size="xs"
      >
        uptime
      </CoreText>
    </CoreBox>
    <CoreBox
      align="center"
      display="flex"
      gap="6px"
    >
      <StatusIcon
        class="metric-dot"
        color="statusHealthy"
      />
      <CoreText
        as="span"
        color="textPrimary"
        size="xs"
        weight="semibold"
      >
        {{ formatRequests(service.metrics.requests) }}
      </CoreText>
      <CoreText
        as="span"
        color="textPrimaryMuted"
        size="xs"
      >
        requests ·
      </CoreText>
      <CoreText
        as="span"
        color="textPrimary"
        size="xs"
        weight="semibold"
      >
        {{ formatErrors(service.metrics.errors) }}
      </CoreText>
      <CoreText
        as="span"
        color="textPrimaryMuted"
        size="xs"
      >
        errors
      </CoreText>
    </CoreBox>
  </CoreBox>

  <CoreBox
    v-else
    align="center"
    display="flex"
    gap="6px"
  >
    <StatusIcon
      class="metric-dot"
      color="statusNeutral"
    />
    <CoreText
      as="span"
      color="textPrimaryMuted"
      size="xs"
      weight="semibold"
    >
      Not configured with runtime yet
    </CoreText>
  </CoreBox>
</template>

<style lang="scss" scoped>
.metric-dot {
    flex-shrink: 0;
}
</style>
