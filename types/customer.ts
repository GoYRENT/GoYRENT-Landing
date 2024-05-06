import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Filter } from './filters'

export interface ModuleUser {
  name: string
  github: string
  twitter: string
}

export interface Website {
  name: string
  description: string
  fullDescription: string
  logo: string
  url: string
  website: string
  category: string
  type: string
  location: Filter
  sponsor: boolean
  // tags: string[]
  compatibility: { nuxt: string, requires: { bridge: boolean } }
  stats: {
    downloads: number
    stars: number
    publishedAt: number
    createdAt: number
  }
  maintainers: {
    name: string
    github: string
    twitter: string
  }[]
  contributors: {
    id: number
    username: string
    contributions: number
  }[]
  readme?: ParsedContent
}




export interface StoriesListGroupItem {
  createdAt: string
  description: string
  domain: string
  favicon: string
  framework: { id: number, slug: string, name: string, url: string, imgPath: string, updatedAt: string, createdAt: string }
  frameworkVersion: string
  hasSSR: boolean
  hostname: string
  id: number
  isFeatured: boolean
  isStatic: boolean
  language: string
  lastDetectedAt: string
  list_group_id: number
  position: number
  rank: string
  screenshotUrl: string
  showcase_id: number
  siteName: string
  slug: string
  title: string
  ui: string
  uiVersion: string
  updatedAt: string
  url: string
  vueVersion: string
}

export interface StoriesListGroup {
  created_at: string
  id: number
  name: string
  position: number
  stories: StoriesListGroupItem[]
  updated_at: string
}

export interface StoriesList {
  created_at: string
  groups: StoriesListGroup[]
  id: number
  name: string
  updated_at: string
}
