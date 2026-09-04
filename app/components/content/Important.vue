<template>
  <Alert
    title="Important"
    icon="i-ph-warning-diamond-duotone"
    color="error"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Alert>
</template>