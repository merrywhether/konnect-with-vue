<script lang="ts" setup>
import { CoreBox } from '#core'

withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap
    interactive?: boolean
  }>(),
  {
    as: 'div',
    interactive: false,
  },
)
</script>

<template>
  <CoreBox
    :as="as"
    bg="bgPrimary"
    border
    :class="{ interactive }"
    direction="column"
    display="flex"
    padding="20px var(--spacing-lg) var(--spacing-lg)"
    radius="sm"
  >
    <slot name="header" />
    <div class="card-body">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </CoreBox>
</template>

<style lang="scss" scoped>
.interactive {
    cursor: pointer;
    transition: box-shadow 0.15s ease;

    &:hover {
        box-shadow: var(--shadow-card);
    }
}

.card-body {
    flex: 1;
    margin-top: var(--spacing-base);
}

.card-footer {
    margin-top: auto;
    padding-top: var(--spacing-base);
}
</style>
