<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px" :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'" :open.sync="menuIsOpen">
        <v-ons-page>
          <v-ons-card>
            <img src="https://storage.googleapis.com/todo-fancy/rookie.png" style="width: 100%" v-if="user.title === 'rookie'">
            <img src="https://storage.googleapis.com/todo-fancy/advance.png" style="width: 100%" v-else-if="user.title === 'advanced'">
            <img src="https://storage.googleapis.com/todo-fancy/master.png" style="width: 100%" v-else-if="user.title === 'master'">
            <img src="https://storage.googleapis.com/todo-fancy/legend.png" style="width: 100%" v-else-if="user.title === 'legend'">
            <div class="title">
              {{ user.title }}
            </div>
            <div class="content">
              <v-ons-list>
                <v-ons-list-header>LVL {{ user.lvl }}</v-ons-list-header>
                <v-ons-list-item>HP {{ user.hp }} | ATK {{ user.atk }}</v-ons-list-item>
              </v-ons-list>
            </div>
          </v-ons-card>
          <v-ons-list>
            <v-ons-list-item v-for="(page, index) in pages" :key="index" tappable modifier="chevron" @click="currentPage = page">
              <div class="center">{{ pageDescription(page) }}</div>
            </v-ons-list-item>
          </v-ons-list>
        </v-ons-page>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <component :is="currentPage"></component>
      </v-ons-splitter-content>
    </v-ons-splitter>
    <v-ons-modal :visible="modalVisible">
      <p style="text-align: center">
        Loading
        <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
      </p>
    </v-ons-modal>
  </v-ons-page>
</template>


<script>
import Battle from '../components/Battle'
import Todos from '../components/TodoList'
import {mapState} from 'vuex'

export default {
  components: {
    battle: Battle,
    todos: Todos
  },
  data () {
    return {
      currentPage: 'todos',
      pages: ['todos', 'battle'],
      modalVisible: false
    }
  },
  methods: {
    pageDescription (page) {
      switch (page) {
        case 'todos' :
          return 'ToDos'
        case 'battle' :
          return 'Battle'
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    menuIsOpen: {
      get () {
        return this.$store.state.isMenuOpen
      },
      set () {
        this.$store.commit('menuOpen')
      }
    }
  },
  beforeCreate () {
    if (!localStorage.getItem('token')) {
      this.$store.commit('changePage', register)      
    } else {
      this.modalVisible = true
      this.$store.dispatch('getTodos')
      .then(() => {
        this.modalVisible = false
      })
      .catch((err) => {
        this.modalVisible = false
        this.$ons.notification.alert(err.message)
      })
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
