<script lang="ts" setup>
import { CoreBox, CoreButton, CoreText } from '#core'
import { ThemedImage } from '#theme'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'Something went wrong',
    subtitle:
            'Our wizards are already conjuring up a fix. Give it another shot!',
  },
)

defineEmits<{
  retry: []
}>()
</script>

<template>
  <CoreBox
    align="center"
    class="error-state"
    direction="column"
    display="flex"
    gap="sm"
  >
    <ThemedImage
      class="error-illustration"
      dark-src="/500_dark.png"
      light-src="/500_light.png"
    />
    <CoreText
      as="p"
      size="md"
      weight="bold"
    >
      {{ title }}
    </CoreText>
    <CoreText
      as="p"
      color="textSecondary"
      size="sm"
    >
      {{ subtitle }}
    </CoreText>
    <CoreButton
      class="retry-button"
      @click="$emit('retry')"
    >
      Retry
    </CoreButton>
  </CoreBox>
</template>

<style lang="scss" scoped>
.error-state {
    container-type: inline-size;
    padding: var(--spacing-2xl) 0;
    text-align: center;
}

.error-illustration {
    height: auto;
    margin-bottom: var(--spacing-sm);
    width: 160px;
}

@container (max-width: 600px) {
    .error-illustration {
        width: 120px;
    }
}

@container (max-width: 400px) {
    .error-illustration {
        width: 96px;
    }
}

.retry-button {
    margin-top: var(--spacing-sm);
}
</style>
