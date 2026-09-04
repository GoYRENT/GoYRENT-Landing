<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').path('/').first())
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

defineOgImage('OgImageSaas', {}, { headline: 'Alquileres y préstamos', title: page.value.title, description: page.value.description })

const pageData = computed(() => ({
  ...(page.value as any) || {},
  ...((page.value as any)?.meta || {})
}))
const hero = computed(() => (page.value as any)?.hero || (page.value as any)?.meta?.hero)
const sections = computed(() => (page.value as any)?.sections || (page.value as any)?.meta?.sections || [])
const features = computed(() => (page.value as any)?.features || (page.value as any)?.meta?.features)
const testimonials = computed(() => (page.value as any)?.testimonials || (page.value as any)?.meta?.testimonials)
const cta = computed(() => (page.value as any)?.cta || (page.value as any)?.meta?.cta)

const carouselImages = [
  'img/pexels-reneasmussen-9974546.jpg',
  'img/pexels-jonathanborba-12876504.jpg',
  'img/pexels-shvetsa-4014733.jpg',
  'img/0c63a88795cda870145ca37d61648604.jpg',
  'img/pexels-mucahitinnci-11791473.jpg',
  'img/pexels-zinep-17910625.jpg',
  'img/pexels-broskibenigno-16138038.jpg'
]
const carouselRef = ref<{ emblaApi: any } | null>(null)
let autoplayInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  autoplayInterval = setInterval(() => {
    const api = (carouselRef.value as any)?.emblaApi
    if (!api) return

    if (api.canScrollNext()) {
      api.scrollNext()
    } else {
      api.scrollTo(0)
    }
  }, 3000)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="hero?.title"
      :description="hero?.description"
      :links="hero?.links"
      :ui="{ root: 'relative isolate overflow-hidden' }"
    >
      <div class="absolute inset-0 landing-grid pointer-events-none z-0 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] gradient" />

      <template #headline>
        <UBadge
          v-if="hero?.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="hero.headline.to"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ hero.headline.label }}

          <UIcon
            v-if="hero.headline.icon"
            :name="hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>

      <template #title>
        <div class="text-6xl">
          <span v-html="hero?.title" />
          <!-- <span class="inline-flex flex-col h-[60px] overflow-hidden">
            <ul class="block text-left leading-tight [&_li]:block animate-text-slide">
              <li class="text-indigo-500">todos los negocios</li>
              <li class="text-rose-500">eventos</li>
              <li class="text-yellow-500">bicicletas</li>
              <li class="text-teal-500">vehículos</li>
              <li class="text-pink-500">Illustrations</li>
              <li class="text-sky-500">Icons</li>
            </ul>
          </span> -->
        </div>
      </template>
    </UPageHero>

    <UPageSection class="!pt-0">
      <!-- <Placeholder /> -->

      <!-- <NuxtImg
        src="/public/landing/GOYRENT.jpeg"
        width="300"
        height="200"
        class="rounded"
      /> -->
      <img
        src="/img/GoYRENT.jpeg"
        class="w-full rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >

      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="carouselImages"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/4',
        }"
        :prev="{
          color: 'neutral',
          variant: 'ghost'
        }"
        :next="{
          color: 'neutral',
          variant: 'ghost'
        }"
        prev-icon="i-heroicons-arrow-left-20-solid"
        next-icon="i-heroicons-arrow-right-20-solid"
        arrows
        dots
        class="w-full"
      >
        <div class="w-full aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <img
            :src="item as string"
            class="w-full h-full object-cover"
            :alt="`GoYRENT showcase ${(item as string).split('/').pop()}`"
          >
        </div>
      </UCarousel>

      <!-- <img
      src="landing/GOYRENT.jpeg"
      class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
    /> -->
    </UPageSection>

    <UPageSection
      v-for="(section, index) in sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :orientation="section.align === 'left' || section.align === 'right' ? 'horizontal' : 'vertical'"
      :reverse="section.align === 'right'"
      :features="section.features"
    >
      <template #title>
        <div class="text-5xl">
          <span v-html="section.title" />
        </div>
      </template>

      <img
        v-if="section.image"
        :src="section.image"
        class="w-4/5 rounded-xl shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </UPageSection>

    <UPageSection
      :title="features?.title"
      :description="features?.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in features?.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :headline="testimonials?.headline"
      :title="testimonials?.title"
      :description="testimonials?.description"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in testimonials?.items"
          :key="index"
          class="break-inside-avoid"
        >
          <UPageCard
            :description="testimonial.quote"
            class="bg-gray-100/50 dark:bg-gray-800/50"
            :ui="{ description: 'text-sm italic' }"
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

    <UPageSection>
      <UPageCTA
        v-bind="cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </UPageSection>
  </div>
</template>

<style>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, var(--ui-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px);
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
  /* Single div carries both classes: layer radial gradient over grid without overriding */
  .landing-grid.gradient {
  background-image:
    radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--ui-primary) 25%, transparent) 0%, var(--ui-bg) 100%),
    linear-gradient(to right, var(--ui-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px);
  background-size: auto, 100px 100px, 100px 100px;
  background-repeat: no-repeat, repeat, repeat;
}
.dark .landing-grid.gradient {
  background-image:
    radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--ui-primary) 15%, transparent) 0%, var(--ui-bg) 100%),
    linear-gradient(to right, var(--ui-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px);
}
</style>
