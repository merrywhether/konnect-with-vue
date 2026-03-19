<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeMode } from './plugin'

const props = defineProps<{
  lightSrc: string
  darkSrc: string
  alt?: string
}>()

const { resolvedMode } = useThemeMode()
const src = computed(() => resolvedMode.value === 'dark' ? props.darkSrc : props.lightSrc)
</script>

<template>
  <img
    :alt="alt ?? ''"
    :src="src"
  >
</template>
