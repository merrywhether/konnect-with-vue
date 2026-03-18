<script lang="ts" setup>
import { CoreBox, CoreText } from '#core'
import { formatRelativeDate } from '#std'
import type { Version, ServiceType } from '#types'
import TypeFlag from './TypeFlag.vue'

defineProps<{
  version: Version
  serviceType: ServiceType
}>()

function abbreviateName(name: string): string {
  const parts = name.split(' ')
  if (parts.length < 2) return name
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}
</script>

<template>
  <div class="version-entry">
    <CoreBox
      class="version-row"
      display="flex"
      gap="lg"
    >
      <CoreBox
        class="version-info"
        direction="column"
        display="flex"
        gap="xs"
      >
        <CoreText
          as="span"
          color="textSecondary"
          size="sm"
          weight="semibold"
        >
          {{ version.name }}
        </CoreText>
        <CoreText
          as="p"
          color="textSecondaryMuted"
          size="xs"
          weight="semibold"
        >
          {{ version.description }}
        </CoreText>
      </CoreBox>

      <CoreBox
        align="center"
        class="version-meta"
        display="flex"
      >
        <TypeFlag :type="serviceType" />

        <CoreBox
          v-if="version.developer"
          align="center"
          class="version-developer"
          display="flex"
          gap="sm"
        >
          <img
            :alt="version.developer.name"
            class="dev-avatar"
            :src="version.developer.avatar"
          >
          <CoreBox
            class="dev-info"
            direction="column"
            display="flex"
          >
            <CoreText
              as="span"
              color="textPrimary"
              size="sm"
              weight="semibold"
            >
              {{ abbreviateName(version.developer.name) }}
            </CoreText>
            <CoreText
              as="span"
              color="textSecondaryMuted"
              size="xs"
            >
              {{ formatRelativeDate(version.updated_at) }}
            </CoreText>
          </CoreBox>
        </CoreBox>
      </CoreBox>
    </CoreBox>
  </div>
</template>

<style lang="scss" scoped>
.version-entry {
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-border-secondary);
    }
}

.version-row {
    align-items: center;
    padding: var(--spacing-base) 0;
}

.version-info {
    flex: 1;
    min-width: 0;
}

.version-meta {
    flex: 1;
    justify-content: space-between;
}

.dev-avatar {
    border-radius: var(--radius-circle);
    height: 20px;
    object-fit: cover;
    width: 20px;
}

.dev-info {
    min-width: 100px;
    text-align: right;
}

@media (max-width: $bp-sm) {
    .version-row {
        align-items: flex-start;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .version-meta {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .dev-info {
        min-width: unset;
        text-align: left;
    }
}
</style>
