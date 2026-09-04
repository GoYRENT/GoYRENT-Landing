export const useCopyToClipboard = () => {
  const copy = async (text: string, opts?: { title?: string, description?: string }) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      const toast = useToast()
      if (opts?.title) {
        toast.add({ title: opts.title, description: opts.description || text, color: 'success' })
      }
    } catch (e) {
      console.error('Copy failed', e)
    }
  }
  return { copy }
}
