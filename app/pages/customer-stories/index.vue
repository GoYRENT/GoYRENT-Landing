<script setup lang="ts">
import type { BlogPost } from '~/types'

const { data: page } = await useAsyncData('customer-stories', () => queryContent('/customer-stories').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = await useAsyncData('posts', () => queryContent<BlogPost>('/customer-stories')
  .where({ _extension: 'md' })
  .sort({ date: -1 })
  .find())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPage
      id="smooth"
      class="pt-20 -mt-20"
    >
      <!-- <template #left>
        <UAside>
          <UNavigationTree :links="[{ label: 'Categorías', disabled: true, children: services }, { label: 'Locations', disabled: true, children: regions }]" />
        </UAside>
      </template> -->

      <UPageBody>
        <UBlogList>
          <UBlogPost
            v-for="(post, index) in posts"
            :key="index"
            :to="post._path"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
            :authors="post.authors"
            :badge="post.badge"
            :orientation="index === 0 ? 'horizontal' : 'vertical'"
            :class="[index === 0 && 'col-span-full']"
            :ui="{
              description: 'line-clamp-2'
            }"
          />
        </UBlogList>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
