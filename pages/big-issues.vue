<template lang="pug">
  main#content.page-about
    section#issues
      .contents.intro
        .left
          h1 {{ page.title }}
          template(v-if="loaded")
            .ornament.orange(v-css-parallax:mobileOff)
            .ornament.yellow(v-css-parallax:mobileOff)
        .right
          p {{ page.introduction }}
      Accordion(:items="page.items", label="Learn More")
</template>

<script>
  import Accordion from '~/components/accordion.vue'
  import { createClient } from '~/plugins/contentful.js'
  const client = createClient()

  export default {
    asyncData ({env, route, error}) {
      return client.getEntries({
        content_type: 'bigIssuesPage',
        'sys.id': env.CTF_ISSUES_ENTRY_ID
      }).then((page) => {
        return {
          page: page.items[0].fields
        }
      }).catch(console.error)
    },

    data: function () {
      return {
        loaded: false
      }
    },

    head: {
      title: 'Big Issues | Know Your Vote T.O.',
      bodyAttrs: {
        class: 'bg-purple'
      }
    },

    components: {
      Accordion
    },

    mounted () {
      document.querySelector('.main-container').focus()

      // Fix bug where parallax images cause the page to scroll horizontally
      setTimeout(() => {
        this.loaded = true
      }, 700)
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  #issues {
    @include grid-media($grid-large) {
      margin-bottom: 290px;
    }

    .contents {
      position: relative;
    }

    .contents.intro {
      margin-bottom: 35px;

      @include grid-media($grid-medium) {
        margin-bottom: 50px;
      }
    }

    h1 {
      margin-bottom: 32px;
    }

    .right p {
      color: $white;
      margin-bottom: 0;
    }

    .ornament {
      &.orange {
        left: -263px; top: 75px;
        width: 238px; height: 238px;
        background-image: url(/img/circle-orange-3.svg);
      }

      &.yellow {
        --multiplier: 0.05;
        right: -330px; top: 200px;
        width: 520px; height: 520px;
        background-image: url(/img/circle-yellow.svg);
      }
    }

    .heading h3 {
      @include grid-media($grid-medium) {
        font: 500 27px/34px $poppins;
      }
    }

    .accordion-container .main {
      h3 {
        font: 500 24px/32px $sans-serif;

        @include grid-media($grid-medium) {
          font: 500 27px/36px $sans-serif;
        }
      }

      p, ul, table {
        margin-bottom: 20px;

        @include grid-media($grid-medium) {
          margin-bottom: 40px;
        }
      }

      ul {
        // padding: 0;
        padding-left: 42px;
      }

      ol {
        padding-left: 49px;
      }

      li, li p {
        color: $blue-4;
        list-style-type: disc;
        font: 500 16px/24px $sans-serif;
        margin-bottom: 6px;

        @include grid-media($grid-medium) {
          font: 500 19px/27px $sans-serif;
          margin-bottom: 0;
        }
      }

      ol li {
        list-style-type: numeral;
      }

      li p {
        margin-bottom: 0;
      }

      p + ul, p + ol {
        @include grid-media($grid-medium) {
          margin-top: -26px;
        }
      }

      img {
        width: 100%; height: auto;

        @include grid-media($grid-medium) {
          width: 45%; height: auto;
          margin: 0 20px 20px 20px;
          float: right
        }
      }
    }
  }


</style>
