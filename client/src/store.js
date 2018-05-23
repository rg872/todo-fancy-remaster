import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import register from './pages/RegisterPage.vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false,
    pageStack: [register],
    user: {},
    todos: [],
    enemies: []
  },
  mutations: {
    nextPage (state, page) {
      state.pageStack.push(page)
    },
    backPage (state, page) {
      state.pageStack.splice(1, state.pageStack.length - 1)
    },
    changePage (state, page) {
      state.pageStack = [page]
    },
    menuOpen (state) {
      state.isMenuOpen = !state.isMenuOpen
    },
    setUser (state, user) {
      state.user = user
    },
    setTodos (state, todos) {
      state.todos = todos
    },
    setNewTodo (state, todo) {
      state.todos.push(todo)
    },
    updateTodo (state, todo) {
      let index = state.todos.indexOf(todo)
      state.todos.splice(index, 1, todo)
    },
    setEnemies (state, enemies) {
      state.enemies = enemies
    },
    changeTitle (state, title) {
      Object.assign({}, state.user, {title})
    },
    deleteTodo (state, todo) {
      let index = state.todos.indexOf(todo)
      state.todos.splice(index, 1)
    }
  },
  actions: {
    signUp ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/signup', payload)
          .then((response) => {
            localStorage.setItem('token', response.headers.token)
            let {title, exp, lvl, hp, atk} = response.data
            commit('setUser', {title, exp, lvl, hp, atk})
            commit('setTodos', response.data.todos)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    signIn ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/signin', payload)
          .then((response) => {
            localStorage.setItem('token', response.headers.token)
            let {title, exp, lvl, hp, atk} = response.data
            commit('setUser', {title, exp, lvl, hp, atk})
            commit('setTodos', response.data.todos)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    oAuth ({commit}, email) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/oauth', {email})
          .then((response) => {
            localStorage.setItem('token', response.headers.token)
            let {title, exp, lvl, hp, atk} = response.data
            commit('setUser', {title, exp, lvl, hp, atk})
            commit('setTodos', response.data.todos)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    getEnemies ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/enemy',
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            commit('setEnemies', response.data.enemies)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    getTodos ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/users',
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            let {title, exp, lvl, hp, atk} = response.data
            commit('setUser', {title, exp, lvl, hp, atk})
            commit('setTodos', response.data.todos)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    createTodo ({commit}, todo) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/', todo,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            commit('setNewTodo', response.data.todo)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    changeTodoStatus ({commit, state}, payload) {      
      return new Promise((resolve, reject) => {
        if (payload.status) {
          payload.exp = state.user.exp + 25
        } else {
          payload.exp = state.user.exp - 25
        }

        if (payload.exp <= 0) {
          payload.lvl = 1
        } else {
          payload.lvl = Math.ceil(payload.exp / 50)
        }
        
        payload.hp = payload.lvl * 50
        payload.atk = payload.lvl * 10

        let id = payload.id
        delete payload.id

        axios.put(`http://localhost:3000/status/${id}`, payload,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            let {exp, lvl, hp, atk} = payload
            let title = response.data.title
            response.data.todo.status = payload.status
            commit('setUser', {title, exp, lvl, hp, atk})
            commit('updateTodo', response.data.todo)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    updateTitle ({commit}, title) {
      console.log(title);
      
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/users/title', {title},
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            commit('changeTitle', title)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    deleteTodo ({commit}, todo) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/${todo._id}`,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            commit('deleteTodo', todo)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
})
