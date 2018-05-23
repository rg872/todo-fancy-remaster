<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('menuOpen')">
          <v-ons-icon icon="fa-align-justify"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        Choose Your Enemy
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="logOut">
          <v-ons-icon icon="fa-sign-out"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list v-show="!inBattle">
        <v-ons-list-item v-for="(enemy, index) in enemies" :key="index" style="width: 100%">
            <v-ons-card>
            <img :src="enemy.image" style="width: 100%">            
            <div class="title">
              {{ enemy.name }}
            </div>
            <div class="content">
              <v-ons-list>
                <v-ons-list-header>Difficulty {{ enemy.difficulty }}</v-ons-list-header>
                <v-ons-list-item>HP {{ enemy.hp }} | ATK {{ enemy.atk }}</v-ons-list-item>
                <br>
                <v-ons-button @click="battle(enemy)">BATTLE</v-ons-button>
              </v-ons-list>
            </div>
          </v-ons-card>
        </v-ons-list-item>
    </v-ons-list>

        <v-ons-row  v-show="inBattle" style="background-image: url('https://vignette.wikia.nocookie.net/smurfsfanon/images/b/bd/Escape-Proof_Dungeon_Door.jpg/revision/latest?cb=20140710032830'); background-size: cover; padding: 10%;">
            <v-ons-col>
                <img src="https://storage.googleapis.com/todo-fancy/rookie.png" style="width: 100%" v-if="user.title === 'rookie'">
                <img src="https://storage.googleapis.com/todo-fancy/advance.png" style="width: 100%" v-else-if="user.title === 'advanced'">
                <img src="https://storage.googleapis.com/todo-fancy/master.png" style="width: 100%" v-else-if="user.title === 'master'">
                <p style="color: white">
                    HP: {{ user.hp }}
                </p>
            </v-ons-col>
            <v-ons-col>
                <h1 style="color: white">{{ battleMessage }}</h1>
            </v-ons-col>
            <v-ons-col>
                <img :src="enemyBattle.image" style="width: 100%">
                <p style="color: white">
                    HP: {{ enemyBattle.hp }}
                </p>
            </v-ons-col>
        </v-ons-row>

    <v-ons-modal :visible="modalVisible">
      <p style="text-align: center">
        Loading <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
      </p>
  </v-ons-modal>
  </v-ons-page>
</template>


<script>
import {mapState} from 'vuex'

export default {
    data () {
        return {
            modalVisible: false,
            inBattle: false,
            enemyBattle: {},
            battleMessage: 'Ready',
            win: null
        }
    },
    methods: {
        battle (enemy) {            
            this.enemyBattle = enemy
            this.inBattle = true
            let self = this
            let battleDone = false
            setTimeout(function () {
                while (!battleDone) {
                    self.enemyBattle.hp -= self.user.atk
                    console.log('mush',self.enemyBattle.hp);

                    if (self.enemyBattle.hp <= 0) {
                        self.battleMessage = 'Congrats! you slay the enemy'
                        battleDone = true
                        self.win = true
                    }

                    if (!battleDone) {
                        self.user.hp -= self.enemyBattle.atk
                        console.log('user',self.user.hp)
                        if (self.user.hp <= 0) {
                            self.battleMessage = 'Oh no! you got slayed by enemy'
                            battleDone = true
                            self.win = false
                        }
                    }    
                }

                if (self.win) {
                let title
                
                if(self.enemyBattle.difficulty === 'easy' && self.user.title === 'rookie') {
                    title = 'advanced'
                } else if(self.enemyBattle.difficulty === 'medium' && self.user.title === 'advanced') {                        
                    title = 'master'
                } else if(self.enemyBattle.difficulty === 'hard' && self.user.title === 'master') {                        
                    title = 'legend'
                }
                self.modalVisible = true
                self.$store.dispatch('updateTitle', title)
                .then(() => {                    
                    self.$store.dispatch('getTodos')
                    .then(() => {
                        self.$store.dispatch('getEnemies')
                        .then(() => {
                            self.modalVisible = false
                            self.inBattle = true
                        })
                    })
                })
                .catch((err) => {
                    self.modalVisible = false
                    self.inBattle = true
                    self.$ons.notification.alert(err.message)
                })

            } else {
                self.modalVisible = true
                self.$store.dispatch('getTodos')
                .then(() => {
                    self.$store.dispatch('getEnemies')
                    .then(() => {
                        self.modalVisible = false
                        self.inBattle = true
                    })
                })
                .catch((err) => {
                    self.modalVisible = false
                    self.inBattle = true
                    self.$ons.notification.alert(err.message)
                })
            }
            }, 2000)
        },
        logOut () {
            localStorage.removeItem('token')
            this.$store.commit('changePage', register)
        }
    },
    created () {
        this.modalVisible = true
        this.$store.dispatch('getEnemies')
        .then(() => {
            this.modalVisible = false
        })
        .catch((err) => {
            this.modalVisible = false
            this.$ons.notification.alert(err.message)
        })
    },
    computed: {
        ...mapState([
            'enemies',
            'user'
        ])
    }
}
</script>

<style scoped>
    v-ons-row {
        
    }
</style>
