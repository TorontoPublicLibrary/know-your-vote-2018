<template lang="pug">
  main#content.page-events
    section#intro-container
      .contents
        .left
          h2(v-html="page.introHeading")
        .right
          div.main-content(v-html="markdown(page.introCopy)")
      .contents
        .item.intro(v-html="markdown(page.introCopyTwo)")
        .ornament.orange(v-css-parallax.mobileOff)
    section#events
      .contents
        .item(v-for="(item, index) in page.items")
          time(:datetime="machinetime(item.fields.eventDate)") {{ humantime(item.fields.eventDate) }}
          h3 {{ item.fields.name }}
          div.main-copy(v-html="markdown(item.fields.mainCopy)")
          .ornament.blue(v-if="index === 1", v-css-parallax.mobileOff)
          .ornament.yellow(v-if="index === 2", v-css-parallax.mobileOff)
        .item
          p(v-html="markdown(page.bottomCopy)")
          .ornament.purple(v-css-parallax.mobileOff)
</template>

<script>
  import Accordion from '~/components/accordion.vue'
  import { createClient } from '~/plugins/contentful.js'
  import moment from 'moment'
  import marked from 'marked'
  const client = createClient()
  marked.setOptions({
    breaks: true
  })

  export default {
    asyncData ({env}) {
      return client.getEntries({
        content_type: 'eventsPage',
        'sys.id': env.CTF_EVENTS_ENTRY_ID
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
      title: 'About | Know Your Vote T.O.',
      bodyAttrs: {
        class: 'bg-blue'
      }
    },

    components: {
      Accordion
    },

    methods: {
      markdown: function (val) {
        return marked(val)
      },
      machinetime: function (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      humantime: function (date) {
        return moment(date).format('dddd, MMMM DD')
      }
    },

    mounted () {
      document.querySelector('.main-container').focus()

      // Fix timing bug with parallax ornaments
      setTimeout(() => {
        this.loaded = true
      }, 700)
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .page-events {
    @include grid-media($grid-large) {
      margin-bottom: 290px;

    }
    .contents {
      position: relative;
    }

    .heading {
      @include gridWidths(6, 6, 6);
    }

    h2 {
      color: $yellow-1;
    }

    .item {
      @include gridWidths(6, 12, 12);
      margin-top: 18px;
      border-top: 1px solid $white;
      padding-top: 44px;
      position: relative;

      &.intro {
        margin-top: 28px;
      }

      a {
        text-decoration: underline;
      }

      time {
        display: block;
        font: 600 16px/22px $montserrat;
        text-transform: uppercase;

        @include grid-media($grid-medium) {
          font: 600 19px/36px $montserrat;
        }
      }

      h3 {
        font: 500 24px/30px $montserrat;

        @include grid-media($grid-medium) {
          font: 500 30px/36px $montserrat;
        }
      }
    }

    #events .item:nth-child(3n+1) h3 {
      color: $orange-1;
    }

    #events .item:nth-child(3n+2) h3 {
      color: $blue-3;
    }

    #events .item:nth-child(3n+3) h3 {
      color: $yellow-1;
    }

    .ornament {
      &.orange {
        right: -316px; top: 75px;
        width: 286px; height: 286px;
        background-image: url(/img/circle-orange-4.svg);
      }

      &.blue {
        left: -316px; top: 0;
        width: 286px; height: 286px;
        background-image: url(/img/circle-blue.svg);
      }

      &.yellow {
        right: -508px; top: -200px;
        width: 478px; height: 478px;
        background-image: url(/img/circle-yellow-2.svg);
      }

      &.purple {
        z-index: -1;
        left: -504px; top: -500px;
        width: 474px; height: 474px;
        background-image: url(/img/circle-purple-2.svg);
      }
    }
  }


</style>
