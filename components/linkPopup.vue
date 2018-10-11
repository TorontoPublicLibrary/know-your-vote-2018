<template lang="pug">
  .link-popup-container(v-if="active", v-on:keyup.esc="closePopup")
    .background(v-on:click="closePopup")
    FocusLock
      .link-popup
        Logo
        p You are now leaving the Know Your Vote T.O. site. Content on these websites is not verified. Would you like to proceed?
        .buttons
          a.continue.no-intercept(:href="targetLink", ref="focusInit") Continue
          a.back(href="#", v-on:click.prevent="closePopup") Go Back
        a.survey.no-intercept(href="https://lbp.hostedincanadasurveys.ca/index.php/774757?lang=en") Or: Tell us what you think about Know Your Vote T.O.
</template>

<script>
  import Logo from '~/components/logo.vue'
  import FocusLock from 'vue-focus-lock'

  export default {
    components: {
      Logo,
      FocusLock
    },

    data: function () {
      return {
        active: false,
        targetLink: false
      }
    },

    methods: {
      closePopup: function () {
        this.active = false
      },
      handleLink: function (e) {
        if (e.target && e.target.host && !e.target.classList.contains('no-intercept') && e.target.href.indexOf('mailto') === -1 && e.target.host !== window.location.host) {
          e.preventDefault()
          this.targetLink = e.target.href
          this.active = true
        }
      }
    },

    mounted () {
      if (process.client) {
        window.addEventListener('click', this.handleLink)
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .link-popup-container {
    .background {
      position: fixed;
      z-index: 9;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: rgba(0, 0, 0, .5);
    }

    .link-popup {
      position: fixed;
      z-index: 10;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - #{$base-padding * 2});
      max-width: 898px;
      padding: 20px;
      background-color: $blue-3;
      box-shadow: 0 20px 20px rgba(0, 0, 0, .15);

      @include grid-media($grid-medium) {
        padding: 50px;
      }
    }

    .logo {
      margin-bottom: 35px;
    }

    svg.logo {
      max-width: 318px; height: auto;
      margin-bottom: 35px;

      #Group_71 path {
        fill: #763f98;
      }
      #Group_73 path {
        fill: #1C2D56;
      }
      #Group_69 path {
        fill: #f7ef6f;
      }
      #Group_67 path {
        fill: #eda571;
      }
    }

    p, a {
      color: $white;
    }

    p {
      font: 500 25px/35px $poppins;
      margin-bottom: 30px;

      @include grid-media($grid-medium) {
        font: 500 35px/50px $poppins;
        margin-bottom: 60px;
      }
    }

    a {
      position: relative;
      font: 500 20px/28px $poppins;
      padding-left: 28px;

      @include grid-media($grid-medium) {
        font: 500 28px/35px $poppins;
        padding-left: 42px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0; top: 4px;
        width: 22px; height: 22px;
        background-size: contain;
        background-repeat: no-repeat;

        @include grid-media($grid-medium) {
          width: 32px; height: 32px;
        }
      }
    }

    a.continue {
      margin-right: 80px;

      &:before {
        background-image: url('/img/icon-arrow-right-white.svg')
      }
    }

    a.back:before {
      background-image: url('/img/icon-plus-white.svg');
      transform: rotate(45deg);
    }

    a.survey {
      padding-left: 0;
      font-size: 18px;
      margin-top: 10px;
      display: block;

      @include grid-media($grid-medium) {
        font-size: 20px;
      }
    }
  }
</style>
