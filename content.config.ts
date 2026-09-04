import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])

const createBaseSchema = () => z.object({
  title: z.string().optional(),
  description: z.string().optional()
}).passthrough()

const createFeatureItemSchema = () => createBaseSchema().extend({
  icon: z.string().optional().editor({ input: 'icon' }),
  name: z.string().optional(),
  title: z.string().optional()
}).passthrough()

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  trailingIcon: z.string().optional().editor({ input: 'icon' }),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
}).passthrough()

const createImageSchema = () => z.object({
  src: z.string().nonempty().editor({ input: 'media' }),
  alt: z.string().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  srcset: z.string().optional()
}).passthrough()

export default defineContentConfig({
  collections: {
    // Legacy generic collection — kept for backward compat (enterprise, help, customer-stories, industries, etc.)
    content: defineCollection({
      type: 'page',
      source: '**/*.{md,yml,yaml,json}',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.coerce.string().optional(),
        draft: z.boolean().optional()
      }).passthrough()
    }),
    index: defineCollection({
      source: '0.index.yml',
      type: 'page',
      schema: z.object({
        hero: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          headline: z.object({
            label: z.string().optional(),
            to: z.string().optional(),
            icon: z.string().optional()
          }).passthrough().optional(),
          links: z.array(createLinkSchema()).optional(),
          align: z.string().optional()
        }).passthrough().optional(),
        sections: z.array(
          createBaseSchema().extend({
            id: z.string().optional(),
            orientation: orientationEnum.optional(),
            align: z.string().optional(),
            reverse: z.boolean().optional(),
            image: z.string().optional(),
            features: z.array(createFeatureItemSchema()).optional(),
            links: z.array(createLinkSchema()).optional()
          }).passthrough()
        ).optional(),
        features: createBaseSchema().extend({
          items: z.array(createFeatureItemSchema()).optional()
        }).passthrough().optional(),
        testimonials: createBaseSchema().extend({
          headline: z.string().optional(),
          items: z.array(
            z.object({
              quote: z.string().optional(),
              author: z.object({
                name: z.string().optional(),
                description: z.string().optional(),
                avatar: createImageSchema().optional()
              }).passthrough().optional(),
              user: z.object({
                name: z.string().optional(),
                description: z.string().optional(),
                to: z.string().optional(),
                target: z.string().optional(),
                avatar: createImageSchema().optional()
              }).passthrough().optional()
            }).passthrough()
          ).optional()
        }).passthrough().optional(),
        cta: createBaseSchema().extend({
          links: z.array(createLinkSchema()).optional()
        }).passthrough().optional()
      }).passthrough()
    }),
    docs: defineCollection({
      source: '1.docs/**/*',
      type: 'page'
    }),
    help: defineCollection({
      source: '4.help/**/*',
      type: 'page'
    }),
    pricing: defineCollection({
      source: '2.pricing.yml',
      type: 'page',
      schema: z.object({
        hero: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          align: z.string().optional()
        }).passthrough().optional(),
        plans: z.array(
          z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            price: z.object({
              month: z.string().optional(),
              year: z.string().optional(),
              discount: z.string().optional()
            }).passthrough(),
            billing_period: z.string().optional(),
            billing_cycle: z.string().optional(),
            align: z.string().optional(),
            badge: z.string().optional(),
            scale: z.boolean().optional(),
            highlight: z.boolean().optional(),
            button: createLinkSchema().optional(),
            features: z.array(z.string()).optional()
          }).passthrough()
        ).optional(),
        logos: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          icons: z.array(z.string()).optional()
        }).passthrough().optional(),
        faq: createBaseSchema().extend({
          items: z.array(
            z.object({
              label: z.string().nonempty(),
              content: z.string().nonempty(),
              defaultOpen: z.boolean().optional()
            }).passthrough()
          ).optional()
        }).passthrough().optional(),
        cta: createBaseSchema().extend({
          links: z.array(createLinkSchema()).optional()
        }).passthrough().optional()
      }).passthrough()
    }),
    blog: defineCollection({
      source: '3.blog.yml',
      type: 'page'
    }),
    posts: defineCollection({
      source: '3.blog/**/*',
      type: 'page',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.object({ src: z.string().nonempty().editor({ input: 'media' }) }).passthrough().optional(),
        authors: z.array(
          z.object({
            name: z.string().nonempty(),
            to: z.string().nonempty(),
            avatar: z.object({ src: z.string().nonempty().editor({ input: 'media' }) }).passthrough()
          }).passthrough()
        ).optional(),
        date: z.coerce.date().optional(),
        badge: z.object({ label: z.string().nonempty() }).passthrough().optional()
      }).passthrough()
    })
  }
})
