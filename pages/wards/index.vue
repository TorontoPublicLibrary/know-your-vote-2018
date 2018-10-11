<template lang="pug">

</template>

<script>
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    mounted () {
      window.$nuxt.$router.push('/')
    }
  }
</script>
