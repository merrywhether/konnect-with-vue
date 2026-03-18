<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CoreBox, CoreButton, CoreText } from '#core'
import { BaseModal } from '#modals'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const slow = ref(false)
const err = ref(false)
const loading = ref(false)

async function fetchSettings() {
  try {
    const res = await fetch('/api/__dev/settings')
    if (!res.ok) return
    const data = await res.json()
    slow.value = data.slow
    err.value = data.err
  } catch {
    // Dev endpoint unavailable
  }
}

async function updateSetting(key: 'slow' | 'err', value: boolean) {
  loading.value = true
  try {
    const res = await fetch('/api/__dev/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    })
    if (!res.ok) return
    const data = await res.json()
    slow.value = data.slow
    err.value = data.err
  } catch {
    if (key === 'slow') slow.value = !value
    if (key === 'err') err.value = !value
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  (val) => {
    if (val) fetchSettings()
  },
)
</script>

<template>
  <BaseModal
    labelled-by="dev-settings-title"
    :open="open"
    width="420px"
    @close="emit('close')"
  >
    <template #title>
      <CoreBox
        direction="column"
        display="flex"
        gap="xs"
      >
        <CoreText
          id="dev-settings-title"
          as="h2"
          color="textPrimary"
          size="lg"
          weight="semibold"
        >
          Dev Settings
        </CoreText>
        <CoreText
          as="p"
          color="textSecondary"
          size="sm"
        >
          These controls affect the mock API server at runtime.
        </CoreText>
      </CoreBox>
    </template>

    <CoreBox
      direction="column"
      display="flex"
      gap="md"
    >
      <CoreBox
        align="center"
        as="label"
        border
        class="setting-row"
        display="flex"
        gap="base"
        padding="base"
        radius="sm"
      >
        <CoreBox
          class="setting-info"
          direction="column"
          display="flex"
          gap="2px"
        >
          <CoreText
            as="span"
            color="textPrimary"
            size="0.9375rem"
            weight="medium"
          >
            Slow mode
          </CoreText>
          <CoreText
            as="span"
            color="textSecondary"
            size="sm"
          >
            Add 800–2500ms artificial latency to every API request.
          </CoreText>
        </CoreBox>
        <input
          :checked="slow"
          class="setting-toggle"
          :disabled="loading"
          type="checkbox"
          @change="updateSetting('slow', !slow)"
        >
      </CoreBox>

      <CoreBox
        align="center"
        as="label"
        border
        class="setting-row"
        display="flex"
        gap="base"
        padding="base"
        radius="sm"
      >
        <CoreBox
          class="setting-info"
          direction="column"
          display="flex"
          gap="2px"
        >
          <CoreText
            as="span"
            color="textPrimary"
            size="0.9375rem"
            weight="medium"
          >
            Error mode
          </CoreText>
          <CoreText
            as="span"
            color="textSecondary"
            size="sm"
          >
            Return 500 on every other API request.
          </CoreText>
        </CoreBox>
        <input
          :checked="err"
          class="setting-toggle"
          :disabled="loading"
          type="checkbox"
          @change="updateSetting('err', !err)"
        >
      </CoreBox>
    </CoreBox>

    <template #actions>
      <CoreButton @click="emit('close')">
        Done
      </CoreButton>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.setting-info {
    flex: 1;
}

.setting-row {
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: var(--color-bg-secondary);
    }
}

.setting-toggle {
    accent-color: var(--color-button-primary);
    cursor: pointer;
    flex-shrink: 0;
    height: 20px;
    width: 20px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
