<script lang="ts" setup>
import { SearchIcon, CloseIcon } from '#icons'
import { CoreBox, CoreButton } from '#core'

defineOptions({ inheritAttrs: false })

defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()
</script>

<template>
  <CoreBox
    align="center"
    bg="bgPrimary"
    border
    class="search-input-wrapper"
    display="flex"
    gap="sm"
    padding="10px 16px 10px 8px"
    radius="sm"
  >
    <SearchIcon
      class="search-icon"
      color="iconPrimary"
    />
    <input
      v-bind="$attrs"
      class="search-input"
      placeholder="Search"
      type="text"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value,
        )
      "
    >
    <CoreButton
      aria-label="Clear search"
      class="clear-button"
      :class="{ 'clear-button--hidden': !modelValue }"
      :tabindex="modelValue ? 0 : -1"
      variant="text"
      @click="$emit('clear')"
    >
      <CloseIcon color="iconPrimary" />
    </CoreButton>
  </CoreBox>
</template>

<style lang="scss" scoped>
.search-input-wrapper {
    width: 100%;
}

.search-icon {
    flex-shrink: 0;
}

.search-input {
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    flex: 1;
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    min-width: 0;
    outline: none;

    &::placeholder {
        color: var(--color-text-disabled);
    }
}

.clear-button {
    align-items: center;
    border-radius: var(--radius-circle);
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: 2px;

    &--hidden {
        pointer-events: none;
        visibility: hidden;
    }
}
</style>
