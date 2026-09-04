<script setup lang="ts">
const { data: page } = await useAsyncData('pricing', () =>
  queryCollection('content').path('/pricing').first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage('OgImageSaas', {}, { title: page.value.title, description: page.value.description })

const isYearly = ref(false)
const have_discount = ref(false)

const meta = computed(() => (page.value as any)?.meta || {})
const pricingPlans = computed(() => {
  const plans = (page.value as any)?.plans || meta.value.plans
  if (!Array.isArray(plans)) return []
  return plans.map((plan: any) => ({
    ...plan,
    badge: plan.badge ? { label: plan.badge } : undefined,
    price: isYearly.value ? plan.price?.year : plan.price?.month,
    discount: isYearly.value ? plan.price?.discount : undefined,
    billingCycle: isYearly.value ? '/anual' : '/mes'
  }))
})
const pricingHero = computed(() => (page.value as any)?.hero || meta.value.hero)
const pricingLogos = computed(() => (page.value as any)?.logos || meta.value.logos)
const pricingFaq = computed(() => (page.value as any)?.faq || meta.value.faq)
const pricingCta = computed(() => (page.value as any)?.cta || meta.value.cta)
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="pricingHero">
      <template #links>
        <div class="flex-1 flex flex-col justify-center items-center flex flex-col items-center justify-center flex-1">
          <div class="mb-3 text-center">
            <UBadge
              variant="subtle"
              size="lg"
              class="relative rounded-full font-semibold"
            >
              <UIcon
                name="i-heroicons-sparkles-20-solid"
                class="ml-1 w-4 h-4 pointer-events-none"
              />
              Ahorra hasta un 20% de descuento con el plan anual
            </UBadge>
          </div>

          <div class="flex items-center gap-3">
            <span :class="{ 'font-semibold text-primary': !isYearly }">Mensual</span>
            <USwitch v-model="isYearly" />
            <span :class="{ 'font-semibold text-primary': isYearly }">Anual (-20%)</span>
          </div>
        </div>
      </template>
    </UPageHero>

    <UContainer>
      <UPageGrid>
        <UPricingPlan
          v-for="(plan, index) in pricingPlans"
          :key="index"
          v-bind="plan"
        />
      </UPageGrid>

      <UPageSection
        title="Características principales de cada plan"
      >
<!--        <Pricing-->
<!--          v-for="(feature, index) in page.feature_plans"-->
<!--          :key="index"-->
<!--          v-bind="feature"-->
<!--        />-->
      </UPageSection>
    </UContainer>

    <UPageSection
      :title="pricingLogos?.title"
      :description="pricingLogos?.description"
    >
      <UPageLogos>
        <UIcon
          v-for="icon in pricingLogos?.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
        />
      </UPageLogos>
    </UPageSection>

    <UContainer>
      <UPageCard
        title="¿Necesitas algún plan personalizado?"
        description="GOYRENT puede ofrecerte un plan personalizado en base a tus propias necesidades. Contacta con nosotros para diseñar su propia oferta."
        :links="[{ label: 'Contacta con nosotros', color: 'neutral', to: 'mailto:team@goyrent.com' }]"
      />
    </UContainer>

    <UPageSection
      :title="pricingFaq?.title"
      :description="pricingFaq?.description"
    >
      <UAccordion
        :items="pricingFaq?.items"
        type="multiple"
        class="max-w-4xl mx-auto"
      />
      <UPageCTA
        v-bind="pricingCta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </UPageSection>
  </div>
</template>

<style scoped>
</style>
