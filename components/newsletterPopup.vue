<template lang="pug">
  .newsletter-popup-container(v-if="active")
    .background(v-on:click="closePopup")
    .newsletter-popup
      a.close(href="#", v-on:click.prevent="closePopup")
      small Newsletters
      p Sign up to receive more information about Toronto’s municipal election
      form.signup-container.election(v-on:submit.prevent="handleSubmit")
        label(for="newsletter-election") Enter Your Address
        .input-container
          input.email(id="newsletter-election", type="text")
          input.submit(type="image", src="img/icon-arrow-right-orange.svg", alt="Subscribe")
      p Sign up to learn more about upcoming events at the Toronto Public Library
      form.signup-container.tpl(v-on:submit.prevent="handleSubmit")
        label(for="newsletter-tpl") Enter Your Address
        .input-container
          input.email(id="newsletter-tpl", type="text")
          input.submit(type="image", src="img/icon-arrow-right-orange.svg", alt="Subscribe")
</template>

<script>
  import Logo from '~/components/logo.vue'

  export default {
    components: {
      Logo
    },

    data: function () {
      return {
        active: false
      }
    },

    mounted () {
      if (process.client) {
        window.addEventListener('click', this.handleLink)
      }
    },

    methods: {
      closePopup: function () {
        this.active = false
      },
      handleSubmit: function (e) {
        // NOTE: This mailing list popup was deemed unneeded so submit was not implemented
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .newsletter-popup-container {
    .background {
      position: fixed;
      z-index: 9;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: rgba(0, 0, 0, .5);
    }

    .newsletter-popup {
      position: fixed;
      z-index: 10;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - #{$base-padding * 2});
      max-width: 898px;
      padding: 20px;
      background-color: $purple-2;
      box-shadow: 0 20px 20px rgba(0, 0, 0, .15);

      @include grid-media($grid-medium) {
        padding: 50px;
      }
    }

    a.close {
      position: absolute;
      top: 32px; right: 32px;
      width: 32px; height: 32px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('/img/icon-plus-white-purple.svg');
      transform: rotate(45deg);
    }

    p, a, small {
      color: $white;
    }

    small {
      font: 500 19px/54px $sans-serif;
      margin: 100px 0 15px 0;
    }

    p {
      font: 500 35px/53px $poppins;
      margin-bottom: 13px;
    }

    label {
      display: block;
      font: 700 20px/24px $sans-serif;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .input-container {
      position: relative;
      margin-bottom: 36px;
    }

    input.email {
      width: calc(100% - 40px);
      height: 52px;
      padding: 0 14px;
      font: 500 30px/32px $sans-serif;
    }

    input.submit {
      position: absolute;
      width: 32px; height: auto;
      right: 12px; top: 50%;
      transform: translateY(-50%);
    }

    .signup-container.tpl input-container {
      margin-bottom: 0;
    }
  }
</style>
