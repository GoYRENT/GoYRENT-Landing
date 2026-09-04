import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends Record<string, any> {
  title: string
  description: string
  date: string | Date
  path?: string
  stem?: string
  seo?: { title?: string, description?: string }
  image?: { src: string, alt?: string }
  badge?: Badge & { label: string }
  authors?: ({
    name: string
    description?: string
    avatar?: Avatar & { src: string }
    to: string
  } & Link)[]
}
