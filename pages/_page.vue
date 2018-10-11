<template lang="pug">
  main#content.page-generic
    section
      h1 Page
      div.main-content {{ page.mainContent }}
    nuxt-link(to="/") Go Home
</template>

<script>
  import { createClient } from '~/plugins/contentful.js'

  const client = createClient()

  export default {

    asyncData ({env, params, error}) {
      return client.getEntries({
        'content_type': 'page',
        'fields.slug': params.page
      }).then((pages) => {
        return {
          page: pages.items[0].fields
        }
      }).catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    },

    head () {
      return {
        title: `${this.page.title} | Know Your Vote T.O.`,
        bodyAttrs: {
          class: 'bg-blue'
        }
      }
    },

    mounted () {
      document.querySelector('.main-container').focus()
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";
</style>
