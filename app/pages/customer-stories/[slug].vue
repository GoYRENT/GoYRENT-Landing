<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const routePath = computed(() => withoutTrailingSlash(route.path))

const { data: post } = await useAsyncData(routePath.value, () => queryCollection('content').path(routePath.value).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${routePath.value}-surround`, () => {
  return queryCollectionItemSurroundings('content', routePath.value, {
    fields: ['description']
  })
})

const title = (post.value as any).seo?.title || post.value.title
const description = (post.value as any).seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if ((post.value as any).meta?.image?.src) {
  useSeoMeta({ ogImage: (post.value as any).meta.image.src })
} else {
  defineOgImage('OgImageSaas', {
    title,
    description,
    headline: 'Customer Stories'
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
            to="/customer-stories"
            icon="i-heroicons-arrow-left-20-solid"
            color="neutral"
            variant="ghost"
            size="xs"
            class="-ml-1"
          >
            Volver a historias
          </UButton>

          <UBadge
            v-bind="post.meta?.badge"
            variant="subtle"
          />
          <span class="text-muted">&middot;</span>
          <time class="text-muted">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
        </div>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.meta?.authors"
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
