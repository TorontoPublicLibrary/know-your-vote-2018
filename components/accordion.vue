<template lang="pug">
  .contents
    .accordion-container(role="tablist")
      .pad
        .item(v-if="item.fields && item.fields.name", v-for="item in items", v-bind:class="{ active: activeItem === item.fields.name || anchorItem === slugify(item.fields.name) }", :id="slugify(item.fields.name)", role="tab")
          .heading(v-on:click="setActiveItem(item.fields.name)", v-on:mousedown="blur", v-on:keyup.enter="setActiveItem(item.fields.name)", v-on:keyup.space="setActiveItem(item.fields.name)", tabindex="0")
            h3 {{ item.fields.name }}
            p(v-if="activeItem == item.fields.name") Minimize
            p(v-else) {{ label }}
            .toggle-button
          vue-slide-up-down.copy(:active="activeItem == item.fields.name || anchorItem === slugify(item.fields.name)", :duration="disableOpenAnimate ? 0 : 400", :aria-hidden="activeItem !== item.fields.name && anchorItem !== slugify(item.fields.name)", role="tabpanel")
            .intro-container(v-if="item.fields.introduction")
              .icon
                img(:src="item.fields.icon.fields.file.url")
              .intro
                p {{ item.fields.introduction }}
            .main(v-if="item.fields.mainCopy", v-html="markdown(item.fields.mainCopy)")
            template(v-if="candidates")
              .candidate-info(v-if="item.fields.candidateInfo")
                p(v-html="markdown(item.fields.candidateInfo)")
              .no-answers(v-if="!item.fields.questionOne && !item.fields.questionTwo && !item.fields.questionThree && !item.fields.questionFour && !item.fields.questionFive")
                p(v-if="item.fields.noContentMessage") {{ item.fields.noContentMessage }}
                p(v-else) Check Back Soon.
              .main.question.first(v-if="item.fields.questionOne")
                strong If elected, what would be your top priority as a City Councillor? Why?
                p(v-html="markdown(item.fields.questionOne)")
              .main.question(v-if="item.fields.questionTwo")
                strong What local issues in your ward deserve more attention? Why?
                p(v-html="markdown(item.fields.questionTwo)")
              .main.question(v-if="item.fields.questionThree")
                strong What should the next City Council do about housing in Toronto? Why?
                p(v-html="markdown(item.fields.questionThree)")
                p
                  nuxt-link(to="/big-issues#housing") To learn more about housing, click here.
              .main.question(v-if="item.fields.questionFour")
                strong What should the next City Council do about transportation and how we get around Toronto? Why?
                p(v-html="markdown(item.fields.questionFour)")
                p
                  nuxt-link(to="/big-issues#getting-around-the-city") To learn more about transportation, click here.
              .main.question(v-if="item.fields.questionFive")
                strong Should the next City Council change anything about municipal taxes or city services? Why?
                p(v-html="markdown(item.fields.questionFive)")
                p
                  nuxt-link(to="/big-issues#municipal-taxes-city-services") To learn more about taxes, click here.
            .minimize-container
              p(v-on:click="setActiveItem(item.fields.name)") Minimize
              .toggle-button(v-on:click="setActiveItem(item.fields.name)")
</template>

<script>
  import marked from 'marked'
  marked.setOptions({
    breaks: true,
    headerIds: false
  })

  export default {
    props: ['items', 'label', 'candidates'],

    data: function () {
      return {
        activeItem: false,
        anchorItem: false,
        disableOpenAnimate: false
      }
    },

    methods: {
      setActiveItem: function (name) {
        const offset = (window.innerWidth > 800) ? -190 : -95

        if (this.anchorItem && this.slugify(name) === this.anchorItem) {
          // Closing the item we anchored to
          this.anchorItem = false
          this.activeItem = false
        } else {
          this.anchorItem = false
          if (this.activeItem === name) {
            // Close the currently active item
            this.activeItem = false
            setTimeout(() => {
              this.$scrollTo(`#${this.slugify(this.items[0].fields.name)}`, 300, { offset: offset })
            }, 500)
          } else {
            this.activeItem = name
            setTimeout(() => {
              this.$scrollTo(`#${this.slugify(this.activeItem)}`, 300, { offset: offset })
            }, 500)
          }
        }
      },

      markdown: function (val) {
        return marked(val)
      },

      slugify: function (text) {
        return text.toString().toLowerCase()
          .replace(/&\s/g, '')
          .replace(/\s+/g, '-')
          .replace(/—/g, '-')
          .replace(/'/g, '')
          .replace(/’/g, '')
          .replace(/\?/g, '')
          .replace(/\./g, '')
      },

      blur: function (e) {
        if (e.target.classList.contains('heading')) {
          e.target.classList.add('no-focus')
        } else {
          e.target.parentNode.classList.add('no-focus')
        }
      }
    },

    mounted () {
      if (this.$nuxt.$route.hash) {
        // Open a section on load based on the URL anchor
        this.anchorItem = this.$nuxt.$route.hash.substring(1)
        this.disableOpenAnimate = true
        setTimeout(() => {
          const offset = (window.innerWidth > 800) ? -190 : -95
          this.$scrollTo(`#${this.anchorItem}`, 1, { offset: offset })
          this.disableOpenAnimate = false
        }, 100)
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .accordion-container {
    @include gridWidths(6, 6, 6);
    margin-bottom: 87px;
    background-color: $white;

    * {
      color: $blue-4;
    }

    .main a {
      text-decoration: underline;
    }

    .main sup {
      vertical-align: top;
      position: relative;
      top: -0.1em;
    }

    .pad {
      padding: 5px $base-padding;

      @include grid-media($grid-medium) {
        padding: 7px $base-padding-medium;
      }
    }

    .item {
      border-bottom: 1px solid $blue-4;

      &:last-child {
        border-bottom: 0;
      }
    }

    .heading {
      position: relative;
      cursor: pointer;

      p, .toggle-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      h3 {
        font: 500 21px/30px $poppins;
        max-width: 85%;
        margin: 8px 0;

        @include grid-media($grid-medium) {
          font: 500 33px/41px $poppins;
          max-width: 65%;
          margin: 11px 0;
        }
      }

      p {
        display: none;
        right: 50px;
        font-family: $poppins;

        @include grid-media($grid-large) {
          display: block;
        }
      }
    }

    .toggle-button {
      position: absolute;
      width: 25px; height: 25px;
      right: 0;
      border-radius: 50%;
      background-color: $blue-4;

      @include grid-media($grid-medium) {
        width: 32px; height: 32px;
      }

      &:after, &:before {
        content: '';
        position: absolute;
        background-color: $white;
        border-radius: 20px;
      }

      &:before {
        width: 2px; height: 18px;
        top: 4px; left: 12px;
        transition: opacity .2s linear;

        @include grid-media($grid-medium) {
          height: 24px;
          left: 15px;
        }
      }

      &:after {
        width: 18px; height: 2px;
        top: 12px; left: 4px;

        @include grid-media($grid-medium) {
          width: 24px;
          top: 15px;
        }
      }
    }

    .intro-container {
      @include grid-container;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 24px 0 40px 0;

      @include grid-media($grid-medium) {
        flex-direction: row;
      }

      .icon {
        width: 100%;
        margin-left: 0;

        @include grid-media($grid-medium) {
          @include grid-column(2);
        }

        @include grid-media($grid-large) {
          @include grid-column(2);
        }

        img {
          width: 50%; height: auto;
          margin-bottom: 18px;

          @include grid-media($grid-medium) {
            width: 75%;
            margin-bottom: 0;
          }
        }
      }

      .intro {
        width: 100%;
        margin-left: 0;

        @include grid-media($grid-medium) {
          margin-left: $base-padding-medium;
          @include grid-column(4);
        }

        @include grid-media($grid-large) {
          margin-left: $base-padding-large;
          @include grid-column(4);
        }

        p {
          font: 500 22px/30px $sans-serif;
          margin-bottom: 0;

          @include grid-media($grid-medium) {
            width: 85%;
            font: 500 27px/34px $sans-serif;
          }
        }
      }
    }

    .main {
      @include grid-media($grid-large) {
        padding-right: 130px;
      }
    }

    .question {
      padding-right: 30px;

      @include grid-media($grid-large) {
        padding-right: 130px;
      }
    }

    .candidate-info, .question.first, .no-answers {
      margin-top: 10px;

      @include grid-media($grid-medium) {
        margin-top: 20px;
      }
    }

    .item.active {
      .toggle-button:before {
        opacity: 0;
      }
    }

    .minimize-container {
      position: relative;
      text-align: right;
      padding-right: 50px;

      p, .toggle-button {
        cursor: pointer;
      }

      p {
        font-family: $poppins;
      }

      .toggle-button {
        right: 0; top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  vue-slide-up-down {
    display: block;
  }

</style>
