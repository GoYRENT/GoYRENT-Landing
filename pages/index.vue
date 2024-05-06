<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}


          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <template #title>
        <span v-html="page.hero?.title" />
      </template>

    </ULandingHero>

    <ULandingHero :description="page.hero.description" :links="page.hero.links">
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

      <template #title>
        <div class="text-6xl">
          <span v-html="page.hero.title" />
          <span class="inline-flex flex-col h-[60px] overflow-hidden">
            <ul class="block text-left leading-tight [&_li]:block animate-text-slide">
              <li class="text-indigo-500">todos los negocios</li>
              <li class="text-rose-500">eventos</li>
              <li class="text-yellow-500">bicicletas</li>
              <li class="text-teal-500">vehículos</li>
              <li class="text-pink-500">Illustrations</li>
              <li class="text-sky-500">Icons</li>
            </ul>
          </span>
        </div>
      </template>

      <template #title2>
        <div class="font-extrabold text-7xl [text-wrap:balance] text-gray-700">
          {{ page.hero.title }}
          We design and develop the best
          <span class="inline-flex flex-col h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] overflow-hidden">
            <ul class="block text-left leading-tight [&_li]:block animate-text-slide">
              <li class="text-indigo-500">todos los negocios</li>
              <li class="text-rose-500">eventos</li>
              <li class="text-yellow-500">bicicletas</li>
              <li class="text-teal-500">vehículos</li>
              <li class="text-pink-500">Illustrations</li>
              <li class="text-sky-500">Icons</li>
            </ul>
          </span>
        </div>
      </template>
    </ULandingHero>

    <ULandingSection class="!pt-0">
      <div class="p-4 bg-gray-100 rounded-md border flex flex-col justify-center items-center overflow-hidden">
        <div class="font-extrabold text-lg [text-wrap:balance] text-gray-700">
          We design and develop the best
          <span class="inline-flex flex-col h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] overflow-hidden">
            <ul class="block text-left leading-tight [&_li]:block animate-text-slide">
              <li class="text-indigo-500">Mobile apps</li>
              <li class="text-rose-500">Websites</li>
              <li class="text-yellow-500">Admin dashboards</li>
              <li class="text-teal-500">Landing pages</li>
              <li class="text-pink-500">Illustrations</li>
              <li class="text-sky-500">Icons</li>
            </ul>
          </span>
        </div>
      </div>
      <!-- <Placeholder /> -->

      <!-- <NuxtImg
        src="/public/landing/GOYRENT.jpeg"
        width="300"
        height="200"
        class="rounded"
      /> -->
      <img
        src="/public/social-card.png"
        class="w-full rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >

      <!-- <img
      src="landing/GOYRENT.jpeg"
      class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
    /> -->
    </ULandingSection>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <img
        src="/public/social-card.png"
        class="w-full rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>

    <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
      <UPageColumns class="xl:columns-4">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" class="bg-gray-100/50 dark:bg-gray-800/50" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
.animate-text-slide {
    animation: text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  }

  @keyframes text-slide {
    0%,
    16% {
      transform: translateY(0%);
    }

    20%,
    36% {
      transform: translateY(-16.66%);
    }

    40%,
    56% {
      transform: translateY(-33.33%);
    }

    60%,
    76% {
      transform: translateY(-50%);
    }

    80%,
    96% {
      transform: translateY(-66.66%);
    }

    100% {
      transform: translateY(-83.33%);
    }
  }
</style>
