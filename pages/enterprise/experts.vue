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
      <ULandingSection v-bind="page.hero">
        <img src="/landing/GOYRENT.jpeg" class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700">
      </ULandingSection>


      <ULandingSection
        v-for="(section, index) in page.sections"
        :key="index"
        :title="section.title"
        :description="section.description"
        :features="section.features"
        :align="section.align"
        :ui="{wrapper: 'py-4 sm:py-2', title: 'text-md sm:text-3xl'}"
      >
        <img
          src="/public/social-card.png"
          class="w-full rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </ULandingSection>

      <ULandingSection :title="page.services.title" :description="page.services.description">
        <UPageGrid>
          <ULandingCard v-for="(item, index) in page.services.items" :key="index" v-bind="item">
            <template v-if="item.img" #icon>
              <img
                :src="item.img"
                class="w-full rounded-lg"
              >
            </template>
          </ULandingCard>
        </UPageGrid>
      </ULandingSection>

      <div id="experts">
        <ULandingSection :title="page.experts.title" :description="page.experts.description">
          <UPageGrid>
            <EnterpriseExpertCard v-for="(item, index) in page.experts.members" :key="index" v-bind="item" />
          </UPageGrid>
        </ULandingSection>
      </div>

      <ULandingSection>
      <ULandingCTA v-bind="page.cta" align="center" class=" dark:bg-gray-800/50 bg-[url('/public/social-card.png')]">
        <!-- <img
          src="https://picsum.photos/640/360"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        /> -->
      </ULandingCTA>

    </ULandingSection>

    </UContainer> 
  </UPage>
</template>
<style scoped lang="postcss">

</style>
