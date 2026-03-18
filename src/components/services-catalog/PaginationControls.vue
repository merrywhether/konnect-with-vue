<script lang="ts" setup>
import { computed } from 'vue'
import { CoreBox, CoreButton, CoreText } from '#core'

const props = defineProps<{
  total: number
  page: number
  pageSize: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const isFirstPage = computed(() => props.page <= 1)
const isLastPage = computed(() => props.page >= totalPages.value)
const rangeStart = computed(() => (props.page - 1) * props.pageSize + 1)
const rangeEnd = computed(() =>
  Math.min(props.page * props.pageSize, props.total),
)

function prev() {
  if (!isFirstPage.value) emit('update:page', props.page - 1)
}

function next() {
  if (!isLastPage.value) emit('update:page', props.page + 1)
}
</script>

<template>
  <CoreBox
    align="center"
    display="flex"
    gap="base"
    justify="center"
    padding="var(--spacing-2xl) 0 var(--spacing-base)"
  >
    <CoreButton
      aria-label="Previous page"
      class="arrow-btn"
      :disabled="isFirstPage"
      variant="outline"
      @click="prev"
    >
      ←
    </CoreButton>

    <CoreText
      as="span"
      color="textPrimaryMuted"
      role="status"
      size="md"
    >
      {{ rangeStart }} to {{ rangeEnd }} of {{ total }} services
    </CoreText>

    <CoreButton
      aria-label="Next page"
      class="arrow-btn"
      :disabled="isLastPage"
      variant="outline"
      @click="next"
    >
      →
    </CoreButton>
  </CoreBox>
</template>

<style lang="scss" scoped>
.arrow-btn {
    border-radius: var(--radius-circle);
    font-size: 1.125rem;
    height: 44px;
    line-height: 1;
    padding: 0;
    width: 44px;
}
</style>
