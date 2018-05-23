<template>
  <v-ons-page>
    <v-ons-card>
      <img src="https://images-na.ssl-images-amazon.com/images/I/713sQo9DrQL.png" style="width: 100%">
      <div class="title center">
        Todo Dungeon
      </div>
      <div class="content">
        <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
          <v-ons-carousel-item v-for="(page, key) in pages" :key="key">
            <component :is="page"></component>
          </v-ons-carousel-item>
        </v-ons-carousel>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import OAuth from '../components/OAuth'
import home from '../pages/HomePage'

export default {
  components: {
    SignUp,
    SignIn,
    OAuth
  },
  data () {
    return {
      carouselIndex: 0,
      pages: ['OAuth', 'SignUp', 'SignIn']
    }
  },
  beforeCreate () {
    if (localStorage.getItem('token')) {
      this.$store.commit('changePage', home)
    } else {
      this.$ons.notification.toast('Swipe left to register and Log in', {
        timeout: 5000,
        animation: 'ascend'
      })
    }
  }
}
</script>

<style>

</style>
