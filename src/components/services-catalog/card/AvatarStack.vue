<script lang="ts" setup>
import { computed } from 'vue'
import { CoreBox, CoreText } from '#core'
import type { Developer } from '#types'

const props = withDefaults(
  defineProps<{
    developers: Developer[]
    max?: number
  }>(),
  { max: 2 },
)

const visible = computed(() => props.developers.slice(0, props.max))
const overflow = computed(() =>
  Math.max(0, props.developers.length - props.max),
)
</script>

<template>
  <CoreBox
    direction="row-reverse"
    display="flex"
  >
    <div
      v-for="dev in visible"
      :key="dev.id"
      class="avatar-wrapper"
    >
      <img
        :alt="dev.name"
        class="avatar-img"
        :src="dev.avatar"
      >
    </div>
    <CoreBox
      v-if="overflow > 0"
      align="center"
      :aria-label="`${overflow} more developers`"
      bg="bgSecondary"
      class="avatar-overflow"
      display="flex"
      justify="center"
      radius="circle"
    >
      <CoreText
        color="textPrimaryMuted"
        size="xs"
        weight="semibold"
      >
        + {{ overflow }}
      </CoreText>
    </CoreBox>
  </CoreBox>
</template>

<style lang="scss" scoped>
.avatar-wrapper {
    border: 2px solid var(--color-bg-primary);
    border-radius: var(--radius-circle);
    height: 36px;
    margin-left: -10px;
    position: relative;
    width: 36px;
    z-index: 0;

    &:last-child {
        margin-left: 0;
    }
}

.avatar-img {
    border-radius: var(--radius-circle);
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
}

.avatar-overflow {
    border: 2px solid var(--color-bg-primary);
    height: 36px;
    position: relative;
    width: 36px;
    z-index: 1;
}
</style>
