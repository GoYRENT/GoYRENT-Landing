export interface Filter {
  key: string | number
  icon?: string
  label?: string
  to?: any
  exactQuery?: boolean
  click?: (e: any) => void
}

export interface Website {
  name: string
  description: string
  icon?: string
  category: string
  type?: string
  sponsor?: boolean
  npm?: string
  repo?: string
  stats: {
    downloads: number
    stars: number
    publishedAt: number
    createdAt: number
    [key: string]: number
  }
  contributors: any[]
  [key: string]: any
}

const iconsMap: Record<string, string> = {
  Analytics: 'i-ph-chart-bar-duotone',
  CMS: 'i-ph-pencil-duotone',
  CSS: 'i-ph-paint-brush-broad-duotone',
  Database: 'i-ph-database-duotone',
  Devtools: 'i-ph-wrench-duotone',
  Ecommerce: 'i-ph-shopping-cart-duotone',
  Extensions: 'i-ph-puzzle-piece-duotone',
  Fonts: 'i-ph-text-aa-duotone',
  Images: 'i-ph-image-duotone',
  Libraries: 'i-ph-books-duotone',
  Monitoring: 'i-ph-timer-duotone',
  Payment: 'i-ph-credit-card-duotone',
  Performance: 'i-ph-gauge-duotone',
  Request: 'i-ph-plugs-connected-duotone',
  Security: 'i-ph-shield-duotone',
  SEO: 'i-ph-file-search-duotone',
  UI: 'i-ph-layout-duotone'
}

export const moduleImage = function (icon: string = '', size: number = 80) {
  if (!icon) return undefined
  if (/^http(s)?:\/\//.test(icon)) return icon
  if (/\.svg$/.test(icon)) return `https://raw.githubusercontent.com/nuxt/modules/main/icons/${icon}`
  return `https://ipx.nuxt.com/s_${size},f_auto/gh/nuxt/modules/main/icons/${icon}`
}

export const moduleIcon = function (category: string) {
  return (iconsMap as any)[category] || 'i-ph-cube-duotone'
}

export const formatNumber = (num: number = 0) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return String(num)
}

export const searchTextRegExp = (q: string = '') => {
  if (!q) return /.*/i
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(escaped, 'i')
}

export const useUseCustomerWebsites = () => {
  const route = useRoute()
  const router = useRouter()
  const websites = useState<Website[]>('websites', () => [])

  async function fetchList() {
    if (websites.value.length) return
    try {
      const res = await $fetch<{ modules?: Website[], websites?: Website[] }>('https://api.nuxt.com/modules')
      const list = (res as any)?.modules || (res as any)?.websites || []
      if (Array.isArray(list)) {
        websites.value = list
      }
    } catch (e) {
      websites.value = []
    }
  }

  const sorts: Filter[] = [
    { key: 'downloads', label: 'Downloads' },
    { key: 'stars', label: 'Stars' },
    { key: 'publishedAt', label: 'Updated' },
    { key: 'createdAt', label: 'Created' }
  ]

  const orders: Filter[] = [
    { key: 'desc', label: 'Desc', icon: 'i-uil-sort-amount-down' },
    { key: 'asc', label: 'Asc', icon: 'i-uil-sort-amount-up' }
  ]

  const categories = computed<Filter[]>(() => {
    return Object.keys(iconsMap).map(category => ({
      key: category,
      label: category,
      exactQuery: true,
      to: {
        name: 'customer-websites' as any,
        query: {
          ...route.query,
          category
        },
        state: { smooth: '#smooth' }
      },
      icon: iconsMap[category] || undefined,
      click: (e: any) => {
        if (route.query.category !== category) return
        e.preventDefault()
        router.replace({ query: { ...route.query, category: undefined } } as any)
      }
    })).sort((a, b) => (a.label as string).localeCompare(b.label as string))
  })

  const selectedCategory = computed(() => {
    return categories.value.find(category => category.key === route.query.category)
  })

  const selectedSort = computed(() => {
    return sorts.find(sort => sort.key === route.query.sortBy) || sorts[0]
  })

  const selectedOrder = computed(() => {
    return orders.find(order => order.key === route.query.orderBy) || orders[0]
  })

  const q = computed<string>(() => {
    return route.query.q as string || ''
  })

  const isSponsor = (a: Website, b: Website) => {
    if (a.sponsor && !b.sponsor) return -1
    else if (!a.sponsor && b.sponsor) return 1
    else return 0
  }

  const filteredWebsite = computed<Website[]>(() => {
    let filtered = [...websites.value]
      .filter((website: Website) => {
        if (selectedCategory.value && website.category !== selectedCategory.value.key) {
          return false
        }
        const queryRegExp = searchTextRegExp(q.value as string)
        if (q.value && !['name', 'npm', 'category', 'description', 'repo'].map(field => (website as any)[field]).filter(Boolean).some(value => String(value).search(queryRegExp) !== -1)) {
          return false
        }
        return true
      })
      .sort((a: Website, b: Website) => {
        const key = selectedSort.value.key as string
        return (b.stats?.[key] || 0) - (a.stats?.[key] || 0)
      })

    if (selectedOrder.value.key === 'asc') {
      filtered = filtered.reverse()
    }

    return filtered.sort(isSponsor)
  })

  const filteredModules = filteredWebsite

  return {
    fetchList,
    sorts,
    orders,
    websites,
    filteredWebsite,
    filteredModules,
    categories,
    selectedCategory,
    selectedSort,
    selectedOrder,
    q
  }
}
