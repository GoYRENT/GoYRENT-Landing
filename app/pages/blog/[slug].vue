<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { BlogPost } from '~/types'

const route = useRoute()
const routePath = computed(() => withoutTrailingSlash(route.path))

const { data: post } = await useAsyncData(routePath.value, () => queryCollection('posts').path(routePath.value).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${routePath.value}-surround`, () => {
  return queryCollectionItemSurroundings('posts', routePath.value, {
    fields: ['description']
  })
})

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value.image?.src) {
  useSeoMeta({ ogImage: post.value.image.src })
} else {
  defineOgImage('OgImageSaas', {
    title,
    description,
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            to="/blog"
            icon="i-heroicons-arrow-left-20-solid"
            color="neutral"
            variant="ghost"
            size="xs"
            class="-ml-1"
          >
            Volver al blog
          </UButton>

          <UBadge
            v-bind="post.badge"
            variant="subtle"
          />
          <span class="text-muted">&middot;</span>
          <time class="text-muted">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
        </div>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            alt="Author avatar"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc
          title="On this page"
          highlight
          :links="post.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
