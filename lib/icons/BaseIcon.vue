<script lang="ts" setup>
import { inject } from 'vue'
import { CSS_VARS_KEY, cssVars, type ColorKey } from '#theme'

const vars = inject(CSS_VARS_KEY, cssVars)

withDefaults(defineProps<{
  color?: ColorKey | (string & {})
  size?: number
  viewBox?: string
}>(), {
  color: 'currentColor',
  size: 20,
  viewBox: '0 0 20 20',
})
</script>

<template>
  <svg
    fill="none"
    :height="size"
    :style="{ color: (vars.colors as Record<string, string>)[color] ?? color }"
    :viewBox="viewBox"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>
