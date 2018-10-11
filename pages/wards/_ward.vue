<template lang="pug">
  main#content.page-ward
    section#ward-info
      .contents
        .left
          .heading-container
            h1 You live in Ward {{ ward.wardNumber }}:<br />{{ ward.name }}
          div.main-content(v-html="markdown(ward.mainCopy)")
        .right
          p.map-heading Ward Map
          p.map-toggle(v-on:click="openMap()", v-bind:class="{ 'hidden' : mapActive === true }") View Ward Map +
          .map-outer(v-bind:class="{ 'active' : mapActive === true }")
            WardMap(:wardname="ward.name", :latitude="ward.latitude", :longitude="ward.longitude")
      .rule
    section#candidates-info
      .contents
        .ornament.yellow(v-css-parallax:mobileOff)
        .ornament.blue(v-css-parallax:mobileOff)
        .left
          h2 Meet Your Candidates<br />For City Councillor
        .right
          p Click below to read their responses to questions about big issues facing your neighbourhood and your city.
          p
            | On Election Day, you can also cast a vote for Mayor and for a local school board trustee.&nbsp;
            nuxt-link(to="/about-voting") Visit the About Voting Page to find out more.
    Accordion(:items="ward.candidates", label="View Candidate Responses", candidates="true")
    .contents.ornament-container
      .ornament.orange(v-css-parallax:mobileOff)
    Issues
</template>

<script>
  import WardMap from '~/components/wardMap.vue'
  import Issues from '~/components/issues.vue'
  import Accordion from '~/components/accordion.vue'
  import { createClient } from '~/plugins/contentful.js'
  import marked from 'marked'
  const client = createClient()
  marked.setOptions({
    breaks: true
  })

  export default {
    data: function () {
      return {
        mapActive: false
      }
    },

    asyncData ({env, params, error}) {
      return client.getEntries({
        'content_type': 'ward',
        'fields.slug': params.ward
      }).then((wards) => {
        return {
          ward: wards.items[0].fields
        }
      }).catch(() => {
        error({ statusCode: 404, message: 'Ward not found' })
      })
    },

    head () {
      return {
        title: `${this.ward.name} | Know Your Vote T.O.`,
        bodyAttrs: {
          class: 'bg-purple'
        }
      }
    },

    components: {
      WardMap,
      Accordion,
      Issues
    },

    methods: {
      markdown (val) {
        if (!val) return '<p></p>'
        return marked(val)
      },
      openMap () {
        this.mapActive = true
      }
    },

    mounted () {
      document.querySelector('.main-container').focus()
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .page-ward {
    #ward-info {
      ul {
        padding-left: 20px;
      }

      p {
        margin-bottom: 0;
      }

      .heading-container {
        margin-bottom: 34px;
      }

      .heading-container p, .heading-container h1 {
        font: 500 27px/33px $poppins;

        @include grid-media($grid-medium) {
          font: 500 40px/47px $poppins;
        }
      }

      .map-heading {
        display: none;

        @include grid-media($grid-medium) {
          display: block;
        }
      }

      .map-toggle {
        @include grid-media($grid-medium) {
          display: none;
        }
      }

      .map-outer {
        display: none;
        width: 100%;
        margin: 0;

        @include grid-media($grid-medium) {
          display: block;
        }

        &.active {
          display: block;
        }
      }

      .rule {
        margin: 42px auto 38px auto;
      }
    }

    #candidates-info .contents, .contents.ornament-container {
      position: relative;
    }

    .ornament {
      &.yellow {
        --multiplier: 0.05;
        right: -314px; top: -200px;
        width: 289px; height: 289px;
        background-image: url(/img/circle-yellow-2.svg);
      }

      &.blue {
        --multiplier: 0.05;
        left: -337px; top: 50%;
        width: 310px; height: 310px;
        background-image: url(/img/circle-blue-2.svg);
      }

      &.orange {
        --multiplier: 0.005;
        right: -288px; top: -40px;
        width: 450px; height: 450px;
        z-index: 0;
        background-image: url(/img/circle-orange-2.svg);
      }
    }
  }
</style>
