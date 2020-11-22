<template>
  <div >
    <video
        type="video/mp4"
        autoplay
        muted
        loop
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
    ></video>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header class="hero">

      <h1
        v-if="data.heroText !== null"
        id="main-title"
      >
        {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        class="description"
      >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
        <img
            v-if="data.featureImage"
            :src="$withBase(data.featureImage)"
        />
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.navbar .logo {
  height: 68px !important;
  margin-right: 0 !important;
  margin-top: -10px !important;
}
.navbar {
  color: rgb(28,30,33);
}
.navbar a {
  font-size: 16px;
}
.navbar .links {
  right: 70 !important;
}
.hero {
  img {
    width: 100%;
    object-fit: cover;
    margin: 30px 0 0 0;
  }
  width: 100%;
  h1 {
    margin-top: 150px !important;
  }
  p {
    z-index 15;
  }
}
video {
  object-fit: cover;
  position relative;
  top: $navbarHeight;
  margin: auto;
  left: 0;
  width 100%;
  height 550px;
  z-index: 0;
}

header {
  z-index 1;
  position:absolute;
  top:0;
  margin: auto;
  left:0;
  right 0
  color: white;
  width 100%
}
.home {
  width: 100% !important;
  padding: 0;
}
.features {
  padding: 0.5rem 1rem;
}
.home
  padding $navbarHeight 2rem 0
  max-width 75%
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.2
      color white
      opacity 0.8

    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      margin-top 60px
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    font-size 20px
    padding 10px
    padding-bottom 80px
    padding-right 20px
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color #333538
    img
      width 200px
      height 200px
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .hero
      .description
        max-width 255px;
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem
      padding-bottom 50px

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem

        padding-bottom 50px

</style>
