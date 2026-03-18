<script lang="ts" setup>
import type { Property } from 'csstype'
import { inject } from 'vue'
import {
  CSS_VARS_KEY,
  cssVars,
  type ColorKey,
  type RadiusKey,
  type SpacingKey,
} from '#theme'

const vars = inject(CSS_VARS_KEY, cssVars)

withDefaults(
  defineProps<{
    align?: Property.AlignItems
    as?: keyof HTMLElementTagNameMap
    bg?: ColorKey | (string & {})
    border?: boolean
    direction?: Property.FlexDirection
    display?: Property.Display
    gap?: SpacingKey | (string & {})
    justify?: Property.JustifyContent
    padding?: SpacingKey | (string & {})
    radius?: RadiusKey | (string & {})
    textAlign?: Property.TextAlign
  }>(),
  {
    align: undefined,
    as: 'div',
    bg: undefined,
    border: false,
    direction: undefined,
    display: undefined,
    gap: undefined,
    justify: undefined,
    padding: undefined,
    radius: undefined,
    textAlign: undefined,
  },
)
</script>

<template>
  <component
    :is="as"
    :style="{
      alignItems: align,
      background: bg
        ? ((vars.colors as Record<string, string>)[bg] ?? bg)
        : undefined,
      border: border
        ? `1px solid ${vars.colors.borderPrimary}`
        : undefined,
      borderRadius: radius
        ? ((vars.radii as Record<string, string>)[radius] ?? radius)
        : undefined,
      display,
      flexDirection: direction,
      gap: gap
        ? ((vars.spacing as Record<string, string>)[gap] ?? gap)
        : undefined,
      justifyContent: justify,
      padding: padding
        ? ((vars.spacing as Record<string, string>)[padding] ?? padding)
        : undefined,
      textAlign,
    }"
  >
    <slot />
  </component>
</template>
