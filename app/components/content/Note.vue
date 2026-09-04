<template>
  <Alert
    title="Note"
    icon="i-ph-info-duotone"
    color="info"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Alert>
</template>