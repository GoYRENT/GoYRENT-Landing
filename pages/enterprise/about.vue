<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
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

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description,
})


</script>

<template>
  <UPage v-if="page">
    <UContainer>
      <UPageHero v-bind="page.hero" />
    </UContainer>


    <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>


    
    <ULandingSection
      :title="page.team.title"
      :description="page.team.description"
    >
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>

      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </UPage>
</template>
<style scoped lang="postcss">

</style>
