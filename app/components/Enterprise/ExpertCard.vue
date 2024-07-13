<template>
  <UCard>
    <div class="flex items-center justify-between mb-6">
      <div class="flex-1 min-w-0">
        <p v-if="name || $slots.name" class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5">
          <slot name="name">
            {{ name }}
          </slot>
        </p>

         
        <p v-if="location || $slots.location" class="text-[15px] text-gray-500 dark:text-gray-400 mt-1 mb-1 flex">
          <UIcon name="i-heroicons-map-pin-16-solid" class="w-5 h-5 flex-shrink-0" />
          <slot name="location">
            {{ location }}
          </slot>
        </p>
      </div>

      <div v-if="logo || $slots.logo" class="inline-flex items-center">
        <slot name="logo">
          <UAvatar :src="(logo as string)" icon="i-heroicons-photo" size="2xl" alt="Logo de {{ name }}" />
        </slot>
      </div>
    </div>

    <div class=" bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-3 mb-6">
      <p class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5">
        Servicios principales
      </p>

      <ul class="space-y-1 my-1">
        <li v-for="service in services" :key="service.name" class="flex items-center text-[14px] text-gray-500 dark:text-gray-400">
          <UIcon name="i-heroicons-check" class="flex-shrink-0 w-4 h-4" />
          <span>{{ service.name }}</span>
        </li>
      </ul>
    </div>

    <UButton v-if="to" :to="to" label="Visitar sitio web" size="lg" color="black" target="_blank" block />
  </UCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { nuxtLinkProps, getNuxtLinkProps } from '#ui/utils'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  ...nuxtLinkProps,
  name: {
    type: String,
    default: undefined
  },
  location: {
    type: String,
    default: undefined
  },
  logo: {
    type: String,
    default: undefined
  },
  services: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  }
})


const slots = useSlots()

</script>

<style>

</style>