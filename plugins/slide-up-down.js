export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 500
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  data: () => ({
    scrollHeight: 0,
    isMounted: false
  }),

  watch: {
    active () {
      this.layout()
    }
  },

  render (h) {
    return h(
      this.tag,
      {
        style: this.style,
        ref: 'container'
      },
      this.$slots.default
    )
  },

  mounted () {
    window.addEventListener('resize', this.layout)
    window.addEventListener('orientationchange', this.layout)

    this.layout()

    this.$nextTick(() => {
      this.isMounted = true
    })
  },

  destroyed () {
    window.removeEventListener('resize', this.layout)
    window.removeEventListener('orientationchange', this.layout)
  },

  computed: {
    style () {
      const hack = this.scrollHeight
      const heightSize = this.active ? this.scrollHeight : 0

      return {
        overflow: 'hidden',
        'transition-property': 'max-height',
        'height': '100%',
        'max-height': this.isMounted ? heightSize + 'px' : 'auto',
        'transition-duration': this.duration + 'ms'
      }
    }
  },

  methods: {
    layout () {
      const { container } = this.$refs
      this.scrollHeight = container.scrollHeight
    }
  }
}
