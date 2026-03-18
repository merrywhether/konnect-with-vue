<script lang="ts" setup>
import { CoreBox } from '#core'
import { BaseCard, SkeletonText } from '#common'
</script>

<template>
  <BaseCard
    aria-hidden="true"
    class="skeleton-card"
  >
    <template #header>
      <CoreBox
        align="center"
        display="flex"
        justify="space-between"
      >
        <CoreBox
          bg="borderSecondary"
          class="skeleton-badge"
          radius="sm"
        />
        <CoreBox
          bg="borderSecondary"
          class="skeleton-pill"
          radius="pill"
        />
      </CoreBox>
    </template>

    <CoreBox
      direction="column"
      display="flex"
      gap="sm"
    >
      <SkeletonText
        size="lg"
        width="70%"
      />
      <SkeletonText size="sm" />
      <SkeletonText size="sm" />
    </CoreBox>

    <template #footer>
      <CoreBox
        align="center"
        display="flex"
        justify="space-between"
      >
        <CoreBox
          class="skeleton-metrics"
          direction="column"
          display="flex"
        >
          <SkeletonText size="xs" />
          <SkeletonText size="xs" />
          <SkeletonText size="xs" />
        </CoreBox>
        <CoreBox display="flex">
          <CoreBox
            bg="borderSecondary"
            class="skeleton-avatar"
            radius="circle"
          />
          <CoreBox
            bg="borderSecondary"
            class="skeleton-avatar"
            radius="circle"
          />
        </CoreBox>
      </CoreBox>
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped>
@keyframes pulse {
    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 0.7;
    }
}

.skeleton-card {
    animation: pulse 1.5s ease-in-out infinite;
    min-height: 232px;
}

.skeleton-badge {
    height: 20px;
    width: 120px;
}

.skeleton-pill {
    height: 28px;
    width: 80px;
}

.skeleton-metrics {
    gap: 6px;
    width: 180px;
}

.skeleton-avatar {
    border: 2px solid var(--color-bg-primary);
    height: 36px;
    margin-left: -10px;
    width: 36px;

    &:first-child {
        margin-left: 0;
    }
}
</style>
