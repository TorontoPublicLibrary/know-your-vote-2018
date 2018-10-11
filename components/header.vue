<template lang="pug">
  header(v-bind:class="{ 'scrolled': scrolled, 'nav-open': mobileNavOpen }")
    a.skip-to-content(v-on:click="skipToContent", href="#content", tabindex="0") Skip to content
    .mobile-nav-toggle(v-on:click="toggleMobileNav")
    .pad
    .contents
      nuxt-link.logo-container(v-on:click.native="closeMobileNav", to="/")
        Logo
      #google_translate_element
      .rule
      nav
        ul
          li: nuxt-link.find-your-ward(v-on:click.native="closeMobileNav", to="/#find-your-ward") Find Your Ward
          li: nuxt-link(v-on:click.native="closeMobileNav", to="/big-issues") Big Issues
          li: nuxt-link(v-on:click.native="closeMobileNav", to="/about-voting") About Voting
          li: nuxt-link(v-on:click.native="closeMobileNav", to="/events") Events
          li: nuxt-link(v-on:click.native="closeMobileNav", to="/about") About
          li: nuxt-link.highlight(v-on:click.native="closeMobileNav", to="/contact") Share Your Feedback
          li.language-picker: nuxt-link(v-on:click.native="showLanguageChooser", to="#") Select Language
          li.ward-saver(v-show="ward"): nuxt-link(v-on:click.native="closeMobileNav", :to="'/wards/' + ward") Return to Your Ward Page <img class="checkmark" alt="" src="/img/checkmark.svg" />
          li.ward-saver(v-show="wardPage && !ward"): a(href="#", v-on:click.prevent="setWard") Save Ward +
</template>

<script>
  import Logo from '~/components/logo.vue'

  export default {
    components: {
      Logo
    },

    data: function () {
      return {
        scrolled: false,
        mobileNavOpen: false
      }
    },

    created () {
      if (process.client) {
        window.addEventListener('scroll', this.handleScroll)
      }
    },

    mounted: function () {
      this.$nextTick(() => {
        this.googleTranslateInit()
      })
    },

    destroyed () {
      if (process.client) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },

    computed: {
      year: function () {
        return (new Date()).getFullYear()
      },
      ward: function () {
        return this.$store.state.ward
      },
      wardPage: function () {
        return (this.$nuxt.$route.params && this.$nuxt.$route.params.ward) ? this.$nuxt.$route.params.ward : false
      }
    },

    methods: {
      skipToContent () {
        document.getElementById('content').focus()
      },

      setWard () {
        this.$store.commit('setWard', this.wardPage)
      },

      toggleMobileNav () {
        this.mobileNavOpen = !this.mobileNavOpen
      },

      closeMobileNav (e) {
        this.mobileNavOpen = false

        if (this.$nuxt.$route.name === 'index' && e.target.classList.contains('find-your-ward')) {
          this.$scrollTo('#map-container', 300, { offset: -200 })
        }
      },

      handleScroll (e) {
        const scroll = window.pageYOffset || document.documentElement.scrollTop
        if (scroll > 100) {
          this.scrolled = true
        } else {
          this.scrolled = false
        }
      },

      googleTranslateInit: function () {
        let checkIfGoogleLoaded = setInterval(() => {
          if (window.google && window.google.translate.TranslateElement != null) {
            clearInterval(checkIfGoogleLoaded)
            this.googleTranslateElement('google_translate_element')
          }
        }, 100)
      },

      googleTranslateElement: function (id) {
        const translateElement = new window.google.translate.TranslateElement({
          autoDisplay: true,
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          gaTrack: true,
          gaId: 'UA-124945289-1'
        }, id)
      },

      showLanguageChooser (e) {
        e.preventDefault()
        document.querySelector('#google_translate_element .goog-te-menu-value').click()
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  header {
    margin-bottom: 40px;

    .skip-to-content {
      position: absolute;
      z-index: 5;
      top: -1000px; left: -1000px;
      height: auto; width: auto;
      padding: 10px;
      border: 1px solid $white;

      &:focus {
        top: 8px; left: 8px;
        overflow: visible;
      }
    }

    #google_translate_element {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      bottom: 12px; right: 32px;
    }

    .pad {
      height: 55px;

      @include grid-media($grid-medium) {
        height: 190px;
      }

      @include grid-media($grid-large) {
        height: 290px;
      }
    }

    .mobile-nav-toggle {
      position: fixed;
      z-index: 10;
      top: $base-padding; right: $base-padding;
      width: 18px; height: 18px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(/img/icon-hamburger.svg);

      @include grid-media($grid-medium) {
        display: none;
      }
    }

    .rule {
      width: 100%;
      z-index: 4;

      @include grid-media($grid-medium) {
        display: none;
      }
    }

    .contents {
      position: fixed;
      z-index: 4;
      left: 50%; top: 0;
      width: 100%;
      transform: translateX(-50%);
      padding-bottom: 8px;
      background-color: $blue-1;

      @include grid-media($grid-medium) {
        padding-bottom: 12px;
      }

      &:before, &:after {
        content: '';
        background-color: inherit;
        position: fixed;
        top: 0;
        z-index: 3;
        width: 100%; height: 100%;
        padding-bottom: 12px;
        box-sizing: border-box;
      }

      &:before {
        left: 0;
        width: 100vw;

        @include grid-media($grid-medium) {
          left: auto;
          right: 100%;
          width: 100%;
        }
      }

      &:after {
        left: 100%;
      }
    }

    .logo-container {
      @include gridWidths(4, 6, 6);
      margin: 20px 0 7px $base-padding;
      z-index: 4;
      transition: margin $logo-transition-speed $logo-transition-easing;

      @include grid-media($grid-medium) {
        margin: 20px 0 14px $base-padding-medium;
      }

      @include grid-media($grid-large) {
        margin: 53px 0 44px $base-padding-large;
      }
    }

    nav {
      @include gridWidths(6, 6, 6);
      position: fixed;
      overflow: auto;
      z-index: 3;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      margin: 0;
      transform: translateY(-100%);
      transition: transform $default-transition-speed $default-transition-easing;

      @include grid-media($grid-medium) {
        display: block;
        position: static;
        transform: none;
        width: calc(100% - #{$base-padding-medium * 2}); height: auto;
        margin-left: $base-padding-medium;
        border-top: 1px solid $white;
        border-bottom: 1px solid $white;
      }

      @include grid-media($grid-large) {
        width: calc(100% - #{$base-padding-large * 2});
        margin-left: $base-padding-large;
      }
    }

    nav ul {
      position: relative;
      padding: 0;
      margin: 124px 0 0 $base-padding;

      @include grid-media($grid-medium) {
        margin: 0;
      }
    }

    nav li {
      display: block;
      list-style-type: none;
      margin-right: 28px;

      @include grid-media($grid-medium) {
        display: inline;
      }
    }

    nav li a {
      text-decoration: none;
      font: 700 20px/24px $sans-serif;
      display: inline-block;
      padding: 15px 0;

      @include grid-media($grid-medium) {
        font: 700 15px/19px $sans-serif;
      }

      &.highlight {
        color: $yellow-1;
      }
    }

    .ward-saver {
      margin-top: $base-padding;
      padding-top: $base-padding;
      border-top: 1px solid $white;

      @include grid-media($grid-medium) {
        position: absolute;
        right: 0;
        margin: 0;
        border: 0;
        padding: 0;
      }
    }

    .checkmark {
      height: 14px; width: auto;
      transform: translateY(1px);
    }

  }

  header.nav-open {
    .mobile-nav-toggle {
      background-image: url(/img/icon-close.svg);
    }

    nav {
      transform: none;
    }
  }

</style>
