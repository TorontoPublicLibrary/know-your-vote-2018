<template lang="pug">
  main#content.page-home
    section#intro-container
      .contents
        .left
          h2(v-html="page.introHeading")
        .right
          div.main-content(v-html="markdown(page.introCopy)")
        .ornament.orange(v-css-parallax:mobileOff)
      .rule
    section#map-container
      .contents.description
        .ornament.purple(v-css-parallax:mobileOff)
        .left
          h1(v-html="page.mapHeading")
        .right
          div.main-content(v-html="markdown(page.mapCopy)")
      Map
    .contents.ornament-container
      .ornament.yellow(v-css-parallax:mobileOff)
    Issues
</template>

<script>
  import Map from '~/components/map.vue'
  import Issues from '~/components/issues.vue'
  import { createClient } from '~/plugins/contentful.js'
  import marked from 'marked'
  const client = createClient()
  marked.setOptions({
    breaks: true
  })

  export default {
    asyncData ({env}) {
      return client.getEntry(env.CTF_HOME_ENTRY_ID).then((page) => {
        return {
          page: page.fields
        }
      }).catch(console.error)
    },

    head: {
      bodyAttrs: {
        class: 'bg-blue'
      }
    },

    components: {
      Map,
      Issues
    },

    methods: {
      markdown: function (val) {
        return marked(val)
      },
      scrollToSearch: function () {
        this.$scrollTo('#map-container', 300, { offset: -200 })
      }
    },

    mounted () {
      document.querySelector('.main-container').focus()
      if (this.$nuxt.$route.hash && this.$nuxt.$route.hash === '#find-your-ward') {
        setTimeout(() => {
          this.scrollToSearch()
        }, 700)
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .page-home {
    #intro-container {
      .contents {
        position: relative;
      }

      h2 {
        color: $yellow-2;
      }

      .rule {
        margin: 8px auto 36px auto;
      }
    }

    #map-container {
      margin-bottom: 63px;

      .contents {
        position: relative;
      }

      .description {
        margin-bottom: 36px;
      }

      h1 {
        color: $orange-1;
      }
    }

    .contents.ornament-container {
      position: relative;
    }

    .ornament {
      &.orange {
        right: -370px; top: 6px;
        width: 346px; height: 346px;
        transform: translateY(var(--translate));
        background-image: url(/img/circle-orange.svg);
      }

      &.purple {
        left: -314px; top: -16px;
        width: 289px; height: 289px;
        transform: translateY(var(--translate));
        background-image: url(/img/circle-purple.svg);
      }

      &.yellow {
        --multiplier: 0.005;
        z-index: 0;
        right: -288px; top: -40px;
        width: 450px; height: 450px;
        background-image: url(/img/circle-yellow.svg);
      }
    }
  }
</style>
