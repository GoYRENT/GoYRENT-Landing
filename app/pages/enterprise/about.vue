<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.head?.title || page.value?.title
const description = page.value?.head?.description || page.value?.description

useSeoMeta({
  titleTemplate: '%s · Enterprise',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Enterprise`
})

defineOgImage('OgImageSaas', {}, { title: page.value.title, description: page.value.description })

const pageData = computed(() => ({
  ...(page.value as any) || {},
  ...((page.value as any)?.meta || {})
}))
</script>

<template>
  <UPage v-if="page">
    <UContainer>
      <UPageHero v-bind="pageData.hero">
        <template #description>
          <div class="text-md">
            <span v-html="pageData.hero?.description" />
          </div>
        </template>
      </UPageHero>
    </UContainer>

    <UPageSection
      :title="pageData.features?.title"
      :description="pageData.features?.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in pageData.features?.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="pageData.team?.title"
      :description="pageData.team?.description"
    >
      <UPageGrid :ui="{ wrapper: 'grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6' }">
        <div
          v-for="(item, index) in pageData.team?.members"
          :key="index"
          v-bind="item"
          class="text-center mx-auto"
        >
          <img
            :src="item.img"
            :alt="item.name"
            class="rounded-full w-40 h-40 mb-2"
            draggable="false"
          >

          <p class="font-semibold">
            {{ item.name }}
          </p>
          <p class="text-[16px] text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
      </UPageGrid>

      <UPageCTA
        v-bind="pageData.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </UPageSection>
  </UPage>
</template>

<style scoped lang="postcss">

</style>
