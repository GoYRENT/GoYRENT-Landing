<script setup lang="ts">
const props = defineProps({
  title: { type: String },
  icon: { type: String },
  color: { type: String, default: 'neutral' },
  to: { type: String }
})

const target = computed(() => (props.to?.startsWith('https://') ? '_blank' : ''))
</script>

<template>
  <ProseCallout
    :icon="icon"
    :color="color"
    :to="to"
    :target="target"
    class="font-medium"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </ProseCallout>
</template>