<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { CoreBox, CoreText } from '#core'
import { KonnectLogo, OrganizationIcon, CogIcon } from '#icons'
import NavButton from './NavButton.vue'

defineEmits<{
  settings: []
}>()
</script>

<template>
  <CoreBox
    align="center"
    as="nav"
    bg="bgNav"
    class="app-nav"
    display="flex"
    justify="space-between"
    padding="14px 24px"
  >
    <RouterLink
      class="nav-logo"
      :to="{ name: 'services' }"
    >
      <KonnectLogo
        :height="26"
        :width="161"
      />
    </RouterLink>

    <CoreBox
      align="center"
      display="flex"
      gap="lg"
    >
      <NavButton>
        <template #icon>
          <OrganizationIcon color="inherit" />
        </template>
        Organization
      </NavButton>
      <NavButton @click="$emit('settings')">
        <template #icon>
          <CogIcon color="inherit" />
        </template>
        Settings
      </NavButton>
      <NavButton>
        <template #icon>
          <CoreBox
            align="center"
            bg="#0a7fae"
            class="profile-avatar"
            display="flex"
            justify="center"
            radius="circle"
          >
            <CoreText
              as="span"
              color="#fff"
              size="0.6875rem"
              weight="semibold"
            >
              JV
            </CoreText>
          </CoreBox>
        </template>
        Johnny Vampire
      </NavButton>
    </CoreBox>
  </CoreBox>
</template>

<style lang="scss" scoped>
.app-nav {
    container: app-nav / inline-size;
    isolation: isolate;
    position: relative;
    z-index: 1;
}

.nav-logo {
    align-items: center;
    color: var(--color-text-nav);
    display: flex;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
        color: var(--color-text-nav-hover);
    }
}

.profile-avatar {
    height: 30px;
    width: 30px;
}
</style>
