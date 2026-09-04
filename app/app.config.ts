export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'rounded-full'
      },
      defaultVariants: {
        size: 'md'
      }
    },
    input: {
      defaultVariants: {
        size: 'md'
      }
    },
    card: {
      slots: {
        root: 'rounded-xl'
      }
    }
  }
})
