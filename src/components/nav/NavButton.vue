<script lang="ts" setup>
import { CoreBox, CoreText } from '#core'

defineEmits<{
  click: []
}>()
</script>

<template>
  <CoreBox
    align="center"
    as="button"
    class="nav-button"
    display="flex"
    gap="8px"
    type="button"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <CoreText
      as="span"
      class="label"
      color="inherit"
      size="0.9375rem"
      weight="semibold"
    >
      <slot />
    </CoreText>
  </CoreBox>
</template>

<style lang="scss" scoped>
.nav-button {
    background: none;
    border: none;
    color: var(--color-text-nav);
    cursor: pointer;
    font-family: var(--font-family);
    padding: 0;
    transition: color 0.15s ease;

    &:hover {
        color: var(--color-text-nav-hover);
    }
}

@container app-nav (max-width: 768px) {
    .label {
        display: none;
    }
}
</style>
