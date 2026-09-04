export const useFilters = (entity: string) => {
  const route = useRoute()
  const router = useRouter()

  const replaceRoute = (name: string, param: string | { key: string }) => {
    router.replace({
      name: entity as any,
      query: {
        ...route.query,
        [name]: typeof param === 'string' ? param : (param as any)?.key || undefined
      },
      state: {
        smooth: '#smooth'
      }
    } as any)
  }

  return {
    replaceRoute
  }
}
