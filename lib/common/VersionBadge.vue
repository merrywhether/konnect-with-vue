<script lang="ts" setup>
import { CoreBox, CoreText } from '#core'

defineProps<{
  count: number
}>()
</script>

<template>
  <CoreBox
    v-if="count > 0"
    as="span"
    bg="statusInfoMuted"
    class="version-badge"
    padding="9px 16px 8px"
    radius="pill"
  >
    <CoreText
      color="statusInfoTextMuted"
      size="sm"
      weight="semibold"
    >
      {{ count }} version{{ count !== 1 ? "s" : "" }}
    </CoreText>
  </CoreBox>
</template>

<style lang="scss" scoped>
.version-badge {
    line-height: 1;
    white-space: nowrap;
}
</style>
