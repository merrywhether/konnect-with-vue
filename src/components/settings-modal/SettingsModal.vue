<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { CoreBox, CoreButton, CoreText } from '#core'
import { BaseModal } from '#modals'
import { ThemePicker } from '#common'

const DevSettings = import.meta.env.DEV
  ? defineAsyncComponent({
    loader: () => import('./DevSettings.vue'),
    onError: (err) => console.error('[DevSettings] failed to load:', err),
  })
  : null

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <BaseModal
    labelled-by="settings-title"
    :open="open"
    width="420px"
    @close="emit('close')"
  >
    <template #title>
      <CoreText
        id="settings-title"
        as="h2"
        color="textPrimary"
        size="lg"
        weight="semibold"
      >
        Settings
      </CoreText>
    </template>

    <CoreBox
      direction="column"
      display="flex"
      gap="lg"
    >
      <!-- Theme selector -->
      <CoreBox
        direction="column"
        display="flex"
        gap="sm"
      >
        <CoreText
          as="p"
          color="textPrimary"
          size="md"
          weight="medium"
        >
          Appearance
        </CoreText>
        <ThemePicker />
      </CoreBox>

      <!-- DevSettings is null in production — the dynamic import is eliminated at build time -->
      <component
        :is="DevSettings"
        v-if="DevSettings"
        :open="open"
      />
    </CoreBox>

    <template #actions>
      <CoreButton @click="emit('close')">
        Done
      </CoreButton>
    </template>
  </BaseModal>
</template>
