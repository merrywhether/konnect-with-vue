<script lang="ts" setup>
import { CoreBox, CoreText } from '#core'
import type { ServiceType } from '#types'

defineProps<{
  type: ServiceType
}>()

const flags = ['HTTP', 'REST'] as const
</script>

<template>
  <CoreBox display="inline-flex">
    <CoreBox
      v-for="flag in flags"
      :key="flag"
      align="center"
      :bg="type === flag ? 'statusInfo' : 'bgSecondary'"
      class="type-flag"
      display="inline-flex"
      radius="sm"
    >
      <CoreText
        color="statusInfoText"
        size="2xs"
        weight="medium"
      >
        {{ flag }}
      </CoreText>
    </CoreBox>
  </CoreBox>
</template>

<style lang="scss" scoped>
.type-flag {
    height: 20px;
    line-height: 1;
    padding: 0 6px;
}
</style>
