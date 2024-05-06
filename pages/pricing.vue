<script setup lang="ts">
const { data: page } = await useAsyncData('pricing', () =>
  queryContent('/pricing').findOne()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description,
})

const isYearly = ref(false)
const have_discount = ref(false)
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero">
      <template #headline>
        <UBadge variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <UIcon name="i-heroicons-sparkles-20-solid" class="ml-1 w-4 h-4 pointer-events-none" />
          20% descuento
        </UBadge>
      </template>
      
      <template #links>
        <div class="flex-1 flex flex-col justify-center items-center flex flex-col items-center justify-center flex-1">
          <div class="mb-3 text-center">
            <UBadge variant="subtle" size="lg" class="relative rounded-full font-semibold">
              <UIcon name="i-heroicons-sparkles-20-solid" class="ml-1 w-4 h-4 pointer-events-none" />
              Ahorra hasta un 20% de descuento con el plan anual
            </UBadge>
          </div>
          <div class="flex items-center gap-2">
            <UPricingToggle
              v-model="isYearly"
              class="w-48"
              left="Mensual"
              right="Anual"
            />
          </div>
        </div>
      </template>
    </UPageHero>

    <UContainer>
      <UPricingGrid compact>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :badge=" plan.badge ? { label: plan.badge }:''"
          :discount="isYearly ? plan.price.discount : '' "
          :price="isYearly ? plan.price.year : plan.price.month"
          :cycle="isYearly ? '/anual' : '/mes'"
        />
      </UPricingGrid>
    </UContainer>

    <ULandingSection
      :title="page.logos.title"
      :description="page.logos.description"
    >
      <ULandingLogos>
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
        />
      </ULandingLogos>
    </ULandingSection>

    <UContainer>
      <UDashboardCard
        title="¿Necesitas algún plan personalizado?"
        description="GOYRENT puede ofrecerte un plan personalizado en base a tus propias necesidades. Contacta con nosotros para diseñar su propia oferta."
        :links="[{ label: 'Contacta con nosotros', color: 'gray', to:'mailto:team@goyrent.com'}]"
      />
    </UContainer>

  

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
  </div>
</template>
<style scoped>
</style>
