<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'outline' | 'text'
  }>(),
  {
    disabled: false,
    type: 'button',
    variant: 'primary',
  },
)

defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <button
    class="core-button"
    :class="`variant-${variant}`"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.core-button {
    border-radius: var(--radius-pill);
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    padding: 10px 20px;
    transition:
        background 0.15s ease,
        opacity 0.15s ease;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.variant-primary {
    background: var(--color-button-primary);
    border: none;
    color: var(--color-button-primary-text);

    &:hover:not(:disabled) {
        opacity: 0.9;
    }
}

.variant-secondary {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    color: var(--color-text-primary);

    &:hover:not(:disabled) {
        background: var(--color-bg-secondary);
    }
}

.variant-outline {
    background: transparent;
    border: 1px solid var(--color-border-primary);
    color: var(--color-link-primary);

    &:disabled {
        color: var(--color-text-disabled);
    }

    &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.05);
    }
}

.variant-text {
    background: transparent;
    border: none;
    color: var(--color-link-primary);

    &:disabled {
        color: var(--color-text-disabled);
    }

    &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.05);
    }
}
</style>
