<template>
  <v-list>
    <template v-if='isAuthenticated'>
      <v-list-item :title='`Вы вошли как: ${userName}`' :append-icon='rail ? "mdi mdi-account" : ""'>
        <v-tooltip v-if='rail' :text='`Вы вошли как: ${userName}`' activator='parent'></v-tooltip>
      </v-list-item>
      <v-list-item @click='logOut()' :append-icon='rail ? "mdi mdi-exit-to-app" : ""'>Выйти
        <v-tooltip v-if='rail' text='Выйти' activator='parent'></v-tooltip>
      </v-list-item>
    </template>
    <v-list-item v-else @click='logIn()' :append-icon='rail ? "mdi mdi-location-enter" : ""'>Вход
      <v-tooltip v-if='rail' text='Вход' activator='parent'></v-tooltip>
    </v-list-item>
    <v-list-item @click='router.push(`/`)' :append-icon='rail ? "mdi mdi-home-outline" : ""'>Главная
      <v-tooltip v-if='rail' text='Главная' activator='parent'></v-tooltip>
    </v-list-item>
    <v-list-item @click='router.push(`/test`)' :append-icon='rail ? "mdi-network-strength-4-cog" : ""'>Тест
      <v-tooltip v-if='rail' text='Тест' activator='parent'></v-tooltip>
    </v-list-item>
  </v-list>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'app-menu',
  props: {
    rail: { type: Boolean }
  },
  setup() {
    const store = useStore()
    const logIn = () => {
      router.push('/auth')
    }, logOut = async () => {
      await store.dispatch('auth/AUTH_LOGOUT')
      logIn()
    }


    return {
      isAuthenticated: computed(() => store.getters['auth/isAuthenticated']),
      userName: computed(() => store.getters['auth/username']),
      logOut,
      logIn,
      router
    }
  }
}
</script>
