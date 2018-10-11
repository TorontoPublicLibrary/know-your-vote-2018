<template lang="pug">
  main#content.page-about
    section#faq
      .contents
        .heading
          h1 {{ page.title }}
          .ornament.orange(v-css-parallax:mobileOff)
          .ornament.yellow(v-css-parallax:mobileOff)
      Accordion(:items="page.items", label="Learn More")
      .contents
        .ornament.blue(v-css-parallax:mobileOff)
</template>

<script>
  import Accordion from '~/components/accordion.vue'
  import { createClient } from '~/plugins/contentful.js'
  const client = createClient()

  export default {
    asyncData ({env}) {
      return client.getEntries({
        content_type: 'aboutPage',
        'sys.id': env.CTF_ABOUT_ENTRY_ID
      }).then((page) => {
        return {
          page: page.items[0].fields
        }
      }).catch(console.error)
    },

    head: {
      title: 'About | Know Your Vote T.O.',
      bodyAttrs: {
        class: 'bg-purple'
      }
    },

    components: {
      Accordion
    },

    mounted () {
      document.querySelector('.main-container').focus()
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/css/utils/index.scss";

  #faq {
    @include grid-media($grid-large) {
      margin-bottom: 290px;

    }
    .contents {
      position: relative;
    }

    .heading {
      @include gridWidths(6, 6, 6);
    }

    h1 {
      margin-bottom: 32px;
    }

    .ornament {
      &.orange {
        left: -462px; top: 75px;
        width: 430px; height: 430px;
        background-image: url(/img/circle-orange-2.svg);
      }

      &.yellow {
        right: -260px; top: 160px;
        width: 238px; height: 238px;
        background-image: url(/img/circle-yellow.svg);
      }

      &.blue {
        --multiplier: 0.005;
        z-index: -1;
        right: -211px; bottom: -182px;
        width: 289px; height: 289px;
        background-image: url(/img/circle-blue-2.svg);
      }
    }
  }


</style>
