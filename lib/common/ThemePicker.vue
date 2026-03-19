<script lang="ts" setup>
import { CoreBox } from '#core'
import { MoonIcon, MonitorIcon, SunIcon } from '#icons'
import { useThemeMode, type ThemeMode } from '#theme'

const { mode, setMode } = useThemeMode()

const options: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
]
</script>

<template>
  <CoreBox
    aria-label="Color theme"
    bg="bgSecondary"
    border
    display="flex"
    padding="3px"
    radius="pill"
    role="radiogroup"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="segment-option"
      :class="{ 'is-active': mode === option.value }"
    >
      <input
        :checked="mode === option.value"
        class="segment-input"
        name="theme-mode"
        type="radio"
        :value="option.value"
        @change="setMode(option.value)"
      >
      <SunIcon v-if="option.value === 'light'" :size="15" />
      <MonitorIcon v-else-if="option.value === 'system'" :size="15" />
      <MoonIcon v-else :size="15" />
      <span>{{ option.label }}</span>
    </label>
  </CoreBox>
</template>

<style lang="scss" scoped>
.segment-input {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.segment-option {
    align-items: center;
    border-radius: var(--radius-pill);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    flex: 1;
    font-size: var(--font-size-sm);
    gap: var(--spacing-xs);
    justify-content: center;
    padding: 6px 12px;
    transition: background 0.15s ease, color 0.15s ease;
    user-select: none;

    &.is-active {
        background: var(--color-bg-primary);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        color: var(--color-text-primary);
        font-weight: 500;
    }
}
</style>
