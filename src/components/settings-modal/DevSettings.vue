<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CoreBox, CoreText } from '#core'

const props = defineProps<{
  open: boolean
}>()

type SettingKey = 'slow' | 'err'

const settings = ref<Record<SettingKey, boolean>>({ slow: false, err: false })
const loading = ref(false)

const options: { key: SettingKey; label: string; description: string }[] = [
  { key: 'slow', label: 'Slow mode', description: 'Add 800–2500ms artificial latency to every API request.' },
  { key: 'err', label: 'Error mode', description: 'Return 500 on every other API request.' },
]

async function fetchDevSettings() {
  try {
    const res = await fetch('/api/__dev/settings')
    if (!res.ok) return
    const data = await res.json()
    settings.value = { slow: data.slow, err: data.err }
  } catch {
    // Dev endpoint unavailable
  }
}

async function updateDevSetting(key: SettingKey, value: boolean) {
  loading.value = true
  try {
    const res = await fetch('/api/__dev/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    })
    if (!res.ok) return
    const data = await res.json()
    settings.value = { slow: data.slow, err: data.err }
  } catch {
    settings.value = { ...settings.value, [key]: !value }
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  (val) => { if (val) fetchDevSettings() },
  { immediate: true },
)
</script>

<template>
  <CoreBox
    style="border-top: 1px solid var(--color-border-primary);"
  />

  <CoreBox
    direction="column"
    display="flex"
    gap="xs"
  >
    <CoreText
      as="p"
      color="textPrimary"
      size="md"
      weight="medium"
    >
      Dev tools
    </CoreText>
    <CoreText
      as="p"
      color="textSecondary"
      size="sm"
    >
      These controls affect the mock API server at runtime.
    </CoreText>
  </CoreBox>

  <CoreBox
    v-for="option in options"
    :key="option.key"
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
        size="md"
        weight="medium"
      >
        {{ option.label }}
      </CoreText>
      <CoreText
        as="span"
        color="textSecondary"
        size="sm"
      >
        {{ option.description }}
      </CoreText>
    </CoreBox>
    <input
      :checked="settings[option.key]"
      class="setting-toggle"
      :disabled="loading"
      type="checkbox"
      @change="updateDevSetting(option.key, !settings[option.key])"
    >
  </CoreBox>
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
