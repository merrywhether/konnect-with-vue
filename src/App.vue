<template>
  <RouterView />
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

body {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    font-family: var(--font-family);
    line-height: 1.5;
}

a {
    color: var(--color-link-primary);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
