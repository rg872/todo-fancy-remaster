<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('menuOpen')">
          <v-ons-icon icon="fa-align-justify"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        Your ToDos List
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="logOut">
          <v-ons-icon icon="fa-sign-out"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-pull-hook :action="loadItem"></v-ons-pull-hook>
    <v-ons-list>
      <v-ons-list-item v-for="(todo, index) in todos" :key="index">
        <div class="left">
          <v-ons-button modifier="outline" @click="changeTodoStatus(todo)">
              <v-ons-icon icon="fa-minus" v-if="!todo.status"></v-ons-icon>
              <v-ons-icon icon="fa-check" v-else></v-ons-icon>
          </v-ons-button>
        </div>
        <div class="center">
          <span class="list-item__title">{{ todo.name }}</span>
          <br>
          <span class="list-item__subtitle">{{ todo.description }}</span>
          <br>
        </div>
        <div class="right">
          <v-ons-button modifier="outline" @click="deleteTodo(todo)">
              <v-ons-icon icon="fa-trash"></v-ons-icon>
          </v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-fab position="bottom right" @click="isCreateShowed = true">
      <v-ons-icon icon="fa-plus"></v-ons-icon>
    </v-ons-fab>
    <v-ons-dialog cancelable :visible.sync="isCreateShowed">
      <div class="dialog-container">
        <h4>Create New Todo</h4>
        <v-ons-input placeholder="name" style="margin-bottom:5%;" v-model="todoName"></v-ons-input>
        <v-ons-input placeholder="description" style="margin-bottom:5%;" v-model="todoDesc"></v-ons-input>
        <v-ons-button @click="createTodo">Create</v-ons-button>
      </div>
    </v-ons-dialog>
    <v-ons-modal :visible="modalVisible">
      <p style="text-align: center">
        Loading
        <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
      </p>
    </v-ons-modal>
  </v-ons-page>
</template>




<script>
import register from '../pages/RegisterPage'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            todoName: '',
            todoDesc: '',
            modalVisible: false,
            isCreateShowed: false
        }
    },
    methods: {
        deleteTodo (todo) {
            this.$store.dispatch('deleteTodo', todo)
            .then(() => {
                this.modalVisible = false
            })
            .catch((err) => {
                this.modalVisible = false
                this.$ons.notification.alert(err.message)
            })
        },
        changeTodoStatus (todo) {    
            let status = !todo.status
            let id = todo._id            
            this.modalVisible = true
            this.$store.dispatch('changeTodoStatus', {status, id})
            .then(() => {
                this.modalVisible = false
            })
            .catch((err) => {
                this.modalVisible = false
                this.$ons.notification.alert(err.message)
            })

        },
        logOut () {
            localStorage.removeItem('token')
            this.$store.commit('changePage', register)
        },
        loadItem () {
            this.modalVisible = true
            this.$store.dispatch('getTodos')
            .then(() => {
                this.modalVisible = false
            })
            .catch((err) => {
                this.modalVisible = false
                this.$ons.notification.alert(err.message)
            })
        },
        createTodo () {
            this.modalVisible = true
            let todo = {
                name: this.todoName,
                description: this.todoDesc
            }
            this.$store.dispatch('createTodo', todo)
            .then(() => {
                this.modalVisible = false
                this.$ons.notification.toast('Success create new todo', {
                    timeout: 3000,
                    animation: 'ascend'
                })
            })
            .catch((err) => {
                this.modalVisible = false
                this.$ons.notification.alert(err.message)
            })
        }
    },

    computed: {
        ...mapState([
            'todos'
        ])
    }
}
</script>

<style scoped>
.dialog-container {
    margin: 10%
}
</style>
