<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/privacy-policy')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

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
  description: page.value.description
})

const headline = computed(() => findPageHeadline(page.value!))
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <!-- <template #left>
        <UAside>
          <template #top>
            <UContentSearchButton class="rounded-md" size="sm" />
          </template>

          <UNavigationTree :links="mapContentNavigation(links)" />
        </UAside>
      </template>
       -->

      <UPageHeader
        :title="page.title"
        :description="page.description"
        :links="page.links"
        :headline="headline"
      />

      <UPageBody prose>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
      </UPageBody>

      <template
        v-if="page.toc !== false"
        #right
      >
        <UContentToc
          title="Tabla de Contenido"
          :links="page.body?.toc?.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped lang="postcss">

</style>
