<template lang="pug">
  section#issues-container
    .contents.heading
      .issues-heading
        h2 Learn About Big Issues
      .vote-heading
        h2 Voting
    .contents.items
      nuxt-link.item(to="/big-issues#housing", tabindex="0")
        .image-container
          img(src="/img/issue-housing.svg", alt="")
        p Housing
        small Learn More +
      nuxt-link.item(to="/big-issues#getting-around-the-city", tabindex="0")
        .image-container
          img(src="/img/issue-transit.svg", alt="")
        p Getting Around the City
        small Learn More +
      nuxt-link.item(to="/big-issues#municipal-taxes-city-services", tabindex="0")
        .image-container
          img(src="/img/issue-taxes.svg", alt="")
        p Municipal Taxes & Services
        small Learn More +
      nuxt-link.item(to="/big-issues#torontos-city-government-and-city-council", tabindex="0")
        .image-container
          img(src="/img/issue-council.svg", alt="")
        p City Council & Toronto's Government
        small Learn More +
      .vote-heading.small
        h2 Voting
      nuxt-link.item(to="/about-voting", tabindex="0")
        .image-container
          img(src="/img/voting.svg", alt="")
        p About Voting
        small Learn More +
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss">
  @import "~assets/css/utils/index.scss";

  #issues-container {
    @include grid-media($grid-medium) {
      margin-bottom: 100px;
    }
  }

  .issues-heading {
    @include gridWidths(6, 4, 4);

    h2 {
      margin-bottom: 0;
      color: $orange-1;
    }
  }

  .vote-heading {
    @include gridWidths(1, 1, 1);
    display: none;

    @include grid-media($grid-medium) {
      display: block;
    }

    h2 {
      color: $blue-3;
      margin-bottom: 0;
    }

    &.small {
      display: block;
      width: calc(100% - #{$base-padding * 2});

      @include grid-media($grid-medium) {
        display: none;
      }
    }
  }

  .vote-heading, .issues-heading {
    padding-bottom: 18px;
    border-bottom: 1px solid $white;
    margin-bottom: 16px;
  }

  .items .item {
    @include gridWidths(3, 1, 1);
    text-decoration: none;

    .image-container {
      padding-bottom: 21px;
      border-bottom: 1px solid $white;
      margin-bottom: 10px;
    }

    img {
      width: 80%;
    }

    p {
      min-height: 66px;
      padding-bottom: 10px;
      border-bottom: 1px solid $white;
      margin-bottom: 10px;

      @include grid-media($grid-medium) {
        min-height: 82px;
      }
    }

    small {
      display: block;
      margin-bottom: 3em;

      @include grid-media($grid-medium) {
        margin-bottom: 0;
      }
    }
  }
</style>
