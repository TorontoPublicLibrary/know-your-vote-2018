<template lang="pug">
  footer
    .contents
      .left
        p.heading A Project By
        a.tpl(href="https://www.torontopubliclibrary.ca/")
          img.logo(src="/img/tpl-logo-gray.svg", alt="Toronto Public Library")
        small.copyright
          | © Copyright {{ (new Date()).getFullYear() }} Toronto Public Library.&nbsp;
          nuxt-link.item(to="/about#privacy") View Privacy Policy.
      .right
        p.heading Join the Conversation
        ul.social
          li
            a.no-intercept(target="_blank", href="https://www.facebook.com/torontopubliclibrary") Facebook
            span &nbsp;/&nbsp;
          li
            a.no-intercept(target="_blank", href="https://www.twitter.com/torontolibrary") Twitter
            span &nbsp;/&nbsp;
          li
            a.no-intercept(target="_blank", href="https://www.instagram.com/torontolibrary") Instagram
          li.survey
            a.no-intercept(href="https://lbp.hostedincanadasurveys.ca/index.php/774757?lang=en", target="_blank") What do you think about Know Your Vote T.O.?
</template>

<script>
  export default {
    computed: {
      year: function () {
        return (new Date()).getFullYear()
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  footer {
    background-color: $white;
    padding: 20px 0;

    @include grid-media($grid-medium) {
      padding: 52px 0;
    }

    .left, .right {
      @include gridWidths(3, 3, 3);
      min-height: 92px;
      position: relative;
    }

    .left {
      margin-bottom: 30px;

      @include grid-media($grid-medium) {
        margin-bottom: 0;
      }
    }

    .left p.heading {
      margin-bottom: 15px;

      @include grid-media($grid-large) {
        margin-bottom: 35px;
      }
    }

    * {
      color: $grey-3;
    }

    .logo {
      height: auto;
      max-width: 74px;

      @include grid-media($grid-large) {
        max-width: 150px;
      }
    }

    .copyright {
      display: block;
      margin-top: 18px;
    }

    .copyright, .copyright a {
      font: 400 12px/16px $sans-serif;
    }

    p.heading {
      font: 700 15px/19px $sans-serif;
      text-transform: uppercase;
    }

    ul.social {
      padding: 0;
      margin-bottom: 0;

      @include grid-media($grid-medium) {
        margin-top: 57px;
      }

      li {
        list-style-type: none;

        @include grid-media($grid-medium) {
          display: inline;
        }

        &.survey {
          display: block;
          margin-top: 10px;
        }
      }

      * {
        font: 400 13px/19px $sans-serif;

        @include grid-media($grid-medium) {
          font: 400 16px/19px $sans-serif;
        }
      }
    }
  }



</style>
