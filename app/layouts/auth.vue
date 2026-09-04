<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'dark:bg-[var(--ui-bg)]'
  }
})
</script>

<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div class="gradient" />

    <UButton
      icon="i-heroicons-home"
      label="Inicio"
      to="/"
      color="neutral"
      class="absolute top-4"
    />

    <slot />
  </div>
</template>

<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--ui-primary) 25%, transparent) 0%, var(--ui-bg) 100%);
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--ui-primary) 15%, transparent) 0%, var(--ui-bg) 100%);
  }
}

.overlay {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, var(--ui-border) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, var(--ui-border) 0.5px, transparent 0.5px);
}
.dark {
  .overlay {
    background-image:
      linear-gradient(to right, var(--ui-border) 0.5px, transparent 0.5px),
      linear-gradient(to bottom, var(--ui-border) 0.5px, transparent 0.5px);
  }
}
</style>
