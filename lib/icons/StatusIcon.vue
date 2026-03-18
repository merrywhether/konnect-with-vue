<script lang="ts" setup>
import BaseIcon from './BaseIcon.vue'

withDefaults(defineProps<{
  size?: number
  color?: string
}>(), {
  size: 6,
  color: 'currentColor',
})
</script>

<template>
  <BaseIcon
    :color="color"
    :size="size"
    viewBox="0 0 6 6"
  >
    <circle
      cx="3"
      cy="3"
      fill="currentColor"
      r="3"
    />
  </BaseIcon>
</template>
