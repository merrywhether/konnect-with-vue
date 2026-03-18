<script lang="ts" setup>
import { PlusIcon } from '#icons'
import { CoreButton } from '#core'

defineEmits<{
  'create-service': []
}>()
</script>

<template>
  <CoreButton
    class="create-btn"
    @click="$emit('create-service')"
  >
    <PlusIcon
      color="var(--color-button-primary-text)"
      :size="16"
    />
    Service Package
  </CoreButton>
</template>

<style lang="scss" scoped>
.create-btn {
    align-items: center;
    display: flex;
    gap: 6px;
    justify-content: center;
    white-space: nowrap;
}
</style>
