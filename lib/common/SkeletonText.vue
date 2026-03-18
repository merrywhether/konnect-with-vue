<script lang="ts" setup>
import { inject } from 'vue'
import { CoreBox } from '#core'
import { CSS_VARS_KEY, cssVars, type FontSizeKey } from '#theme'

const vars = inject(CSS_VARS_KEY, cssVars)

const props = withDefaults(
  defineProps<{
    size?: FontSizeKey
    width?: string
  }>(),
  {
    size: 'base',
    width: undefined,
  },
)

// if width is not provided, generate a random width between 30% and 90%
const instanceWidth = props.width ?? `${Math.floor(Math.random() * 61) + 30}%`
</script>

<template>
  <CoreBox
    aria-hidden="true"
    bg="borderSecondary"
    radius="sm"
    :style="{
      flexShrink: 0,
      height: vars.typography.sizes[size],
      width: instanceWidth,
    }"
  />
</template>
