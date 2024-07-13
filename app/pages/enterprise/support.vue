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
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.hero.items" :key="index" v-bind="item" />
      </UPageGrid>
    </UContainer>
    

    <ULandingSection class="py-4 sm:py-8" :ui="{ container: 'gap-y-0 sm:gap-y-0' }">
      <EnterpriseSupportFormSection />
     
      <ul class="flex space-x-10 flex-wrap justify-center mt-10">
        <li v-for="(logo) in page.logos" :key="logo" class="pt-8">
          <NuxtImg :src="logo.src" :width="logo.width" height="24" alt="" />
        </li>
      </ul>
      <UPageColumns class="my-[72px]">
        <!-- Hack for Safari -->
        <div v-for="(testimonial, index) in page.testimonials" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" :ui="{ background: 'card-testimonial-bg' }" />
        </div>
      </UPageColumns>
    </ULandingSection>



    <ULandingSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <ULandingFAQ
        :items="page.faq.items"
        multiple
        class="max-w-4xl mx-auto"
      />
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </UPage>
</template>
<style scoped lang="postcss">
.dark .card-testimonial-bg {
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.20) 0%, rgba(15, 23, 42, 0.20) 100%), linear-gradient(180deg, rgba(51, 65, 85, 0.50) 0%, rgba(2, 4, 32, 0.50) 33.92%);
}
</style>
