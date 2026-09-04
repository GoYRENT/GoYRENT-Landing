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
      <UPageSection v-bind="pageData.hero">
        <img
          src="/img/GoYRENT.jpeg"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </UPageSection>

      <UPageSection
        v-for="(section, index) in pageData.sections"
        :key="index"
        :title="section.title"
        :description="section.description"
        :features="section.features"
        :orientation="section.align === 'left' || section.align === 'right' ? 'horizontal' : 'vertical'"
        :reverse="section.align === 'right'"
        :ui="{ wrapper: 'py-4 sm:py-2', title: 'text-md sm:text-3xl' }"
      >
        <img
          src="/img/GoYRENT.jpeg"
          class="w-full rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </UPageSection>

      <UPageSection
        :title="pageData.services?.title"
        :description="pageData.services?.description"
      >
        <UPageGrid>
          <UPageCard
            v-for="(item, index) in pageData.services?.items"
            :key="index"
            v-bind="item"
          >
            <template
              v-if="item.img"
              #icon
            >
              <img
                :src="item.img"
                class="w-full rounded-lg"
              >
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageSection>

      <div id="experts">
        <UPageSection
          :title="pageData.experts?.title"
          :description="pageData.experts?.description"
        >
          <UPageGrid>
            <EnterpriseExpertCard
              v-for="(item, index) in pageData.experts?.members"
              :key="index"
              v-bind="item"
            />
          </UPageGrid>
        </UPageSection>
      </div>

      <UPageSection>
        <UPageCTA
          v-bind="pageData.cta"
          orientation="vertical"
          class=" dark:bg-gray-800/50 bg-[url('/img/GoYRENT.jpeg')]"
        >
        <!-- <img
          src="https://picsum.photos/640/360"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        /> -->
        </UPageCTA>
      </UPageSection>
    </UContainer>
  </UPage>
</template>

<style scoped lang="postcss">

</style>
