<template lang="pug">
  .main-container(tabindex="0")
    NewsletterPopup
    LinkPopup
    .bg
    Header
    nuxt
    Footer
</template>

<script>
  import Header from '~/components/header.vue'
  import Footer from '~/components/footer.vue'
  import LinkPopup from '~/components/linkPopup.vue'
  import NewsletterPopup from '~/components/newsletterPopup.vue'

  export default {
    components: {
      Header,
      Footer,
      LinkPopup,
      NewsletterPopup
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/index.scss";

  .bg {
    background-color: $blue-1;
    position: fixed;
    width: 100vw; height: 100vh;
    top: 0; left: 0;
    z-index: -1;
  }
</style>
