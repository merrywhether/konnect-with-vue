<script lang="ts" setup>
import { CoreBox, CoreButton, CoreText } from '#core'
import CreateServiceButton from '../create-service/CreateServiceButton.vue'

defineProps<{
  mode: 'empty' | 'no-results'
  query?: string
}>()

defineEmits<{
  clear: []
  'create-service': []
}>()
</script>

<template>
  <CoreBox
    align="center"
    class="empty-state"
    direction="column"
    display="flex"
    gap="md"
  >
    <img
      alt=""
      class="empty-img"
      src="/lost_kong.png"
    >
    <CoreText
      as="p"
      size="lg"
      weight="semibold"
    >
      {{
        mode === "no-results"
          ? `No services match "${query}"`
          : "No services"
      }}
    </CoreText>
    <CoreText
      as="p"
      color="textSecondary"
      size="base"
    >
      Create a new service to get started.
    </CoreText>
    <CoreBox
      class="empty-actions"
      display="flex"
      gap="md"
    >
      <CreateServiceButton @create-service="$emit('create-service')" />
      <CoreButton
        v-if="mode === 'no-results'"
        variant="secondary"
        @click="$emit('clear')"
      >
        Clear search
      </CoreButton>
    </CoreBox>
  </CoreBox>
</template>

<style lang="scss" scoped>
.empty-actions {
    margin-top: var(--spacing-sm);
}

.empty-img {
    height: auto;
    margin-bottom: var(--spacing-md);
    max-width: 200px;
}

.empty-state {
    padding: 60px 20px;
    text-align: center;
}
</style>
