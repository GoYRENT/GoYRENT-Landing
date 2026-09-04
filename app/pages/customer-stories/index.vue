<script setup lang="ts">
const { data: page } = await useAsyncData('customer-stories', () => queryCollection('content').path('/customer-stories').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = await useAsyncData('posts', () => queryCollection('content').where('path', 'LIKE', '/customer-stories/%').order('date', 'DESC').all())

const postsList = computed(() => (posts.value || []).map((post: any) => ({
  ...post,
  image: post.meta?.image,
  authors: post.meta?.authors,
  badge: post.meta?.badge
})))

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('OgImageSaas', {
  title,
  description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="page?.title"
      :description="page?.description"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in postsList"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
