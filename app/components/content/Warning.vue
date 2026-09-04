<template>
  <Alert
    title="Warning"
    icon="i-ph-warning-duotone"
    color="warning"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Alert>
</template>