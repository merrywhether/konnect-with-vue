<script lang="ts" setup>
import { inject } from 'vue'
import {
  CSS_VARS_KEY,
  cssVars,
  type FontSizeKey,
  type FontWeightKey,
  type ColorKey,
} from '#theme'

const vars = inject(CSS_VARS_KEY, cssVars)

withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap
    size?: FontSizeKey | (string & {})
    weight?: FontWeightKey
    color?: ColorKey | (string & {})
    nowrap?: boolean
  }>(),
  {
    as: 'span',
    size: 'base',
    weight: 'normal',
    color: 'textPrimary',
    nowrap: false,
  },
)

const sizes = vars.typography.sizes as Record<string, string>
const weights = vars.typography.weights as Record<FontWeightKey, string>
const colors = vars.colors as Record<ColorKey, string>
</script>

<template>
  <component
    :is="as"
    :style="{
      fontSize: sizes[size as string] ?? size,
      fontWeight: weights[weight],
      color: colors[color as ColorKey] ?? color,
      whiteSpace: nowrap ? 'nowrap' : undefined,
    }"
  >
    <slot />
  </component>
</template>
