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
      <UPageHero v-bind="pageData.hero" />
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in pageData.hero?.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </UContainer>

    <UPageSection
      class="py-4 sm:py-8"
      :ui="{ container: 'gap-y-0 sm:gap-y-0' }"
    >
      <EnterpriseSupportFormSection />

      <!-- <ul class="flex space-x-10 flex-wrap justify-center mt-10">
        <li
          v-for="(logo) in page.logos"
          :key="logo"
          class="pt-8"
        >
          <NuxtImg
            :src="logo.src"
            :width="logo.width"
            height="24"
            alt=""
          />
        </li>
      </ul> -->
      <UPageColumns class="my-[72px]">
        <!-- Hack for Safari -->
        <div
          v-for="(testimonial, index) in pageData.testimonials"
          :key="index"
          class="break-inside-avoid"
        >
          <UPageCard
            :description="testimonial.quote"
            :ui="{ background: 'card-testimonial-bg', description: 'text-sm italic' }"
          >
            <template #footer>
              <div class="flex items-center gap-3">
                <UAvatar v-if="testimonial.author?.avatar" :src="testimonial.author.avatar.src" :alt="testimonial.author.name" size="md" />
                <div>
                  <p class="font-semibold text-sm">{{ testimonial.author?.name }}</p>
                  <p class="text-xs text-muted">{{ testimonial.author?.description }}</p>
                </div>
              </div>
            </template>
          </UPageCard>
        </div>
      </UPageColumns>
    </UPageSection>

    <UPageSection
      :title="pageData.faq?.title"
      :description="pageData.faq?.description"
    >
      <UAccordion
        :items="pageData.faq?.items"
        type="multiple"
        class="max-w-4xl mx-auto"
      />
      <UPageCTA
        v-bind="pageData.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </UPageSection>
  </UPage>
</template>

<style scoped lang="postcss">
.dark .card-testimonial-bg {
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.20) 0%, rgba(15, 23, 42, 0.20) 100%), linear-gradient(180deg, rgba(51, 65, 85, 0.50) 0%, rgba(2, 4, 32, 0.50) 33.92%);
}
</style>
