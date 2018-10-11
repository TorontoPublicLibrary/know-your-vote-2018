<template lang="pug">
  main#content.page-about-voting
    section#contact
      .contents
        .heading
          h1 {{ page.title }}
        .copy(v-html="markdown(page.mainContent)")
      .contents.ornaments
        .ornament.purple(v-css-parallax:mobileOff)
        .ornament.orange(v-css-parallax:mobileOff)
        .ornament.yellow(v-css-parallax:mobileOff)
</template>

<script>
  import marked from 'marked'
  import { createClient } from '~/plugins/contentful.js'
  const client = createClient()
  marked.setOptions({
    breaks: true
  })

  export default {
    asyncData ({env}) {
      return client.getEntry(env.CTF_ABOUT_VOTING_ENTRY_ID).then((page) => {
        return {
          page: page.fields
        }
      }).catch(console.error)
    },

    head: {
      title: 'About Voting | Know Your Vote T.O.',
      bodyAttrs: {
        class: 'bg-blue'
      }
    },

    methods: {
      markdown: (val) => {
        return marked(val)
      }
    },

    mounted () {
      document.querySelector('.main-container').focus()
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .page-about-voting {
    margin-bottom: 90px;

    @include grid-media($grid-large) {
      margin-bottom: 500px;
    }

    .heading {
      @include gridWidths(6, 2 of 5, 2 of 5);
    }

    .copy {
      @include gridWidths(6, 3 of 5, 3 of 5);
    }

    h1 {
      margin-bottom: 32px;
    }

    .ornaments {
      position: relative;
    }

    .ornament {
      &.purple {
        --multiplier: 0.03;
        left: -104px; top: -100px;
        width: 450px; height: 450px;
        background-image: url(/img/circle-purple.svg);
      }

      &.orange {
        --multiplier: 0.01;
        right: 35%; top: 110px;
        width: 323px; height: 323px;
        background-image: url(/img/circle-orange.svg);
      }

      &.yellow {
        --multiplier: 0.05;
        right: 12%; top: 110px;
        width: 146px; height: 146px;
        background-image: url(/img/circle-yellow-2.svg);
      }
    }
  }
</style>
