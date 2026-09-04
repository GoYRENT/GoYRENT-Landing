<template>
  <Alert
    title="Tip"
    icon="i-ph-lightbulb-duotone"
    color="success"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Alert>
</template>