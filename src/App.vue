<template>
  <v-app>
    <v-layout class='rounded rounded-md'>
      <v-navigation-drawer
          v-model='navStartState'
          :permanent='navStartState'
          color="primary"
          ref="leftPanel"
      >
        <v-list>
          <v-list-item @click="rail = !rail" :append-icon='!rail ? "mdi-chevron-left" : "mdi-chevron-right"'>
          </v-list-item>
        </v-list>
        <app-menu :rail='rail'></app-menu>
      </v-navigation-drawer>

      <v-app-bar v-if='header' :title='header' @click="navStartState = true"></v-app-bar>


      <v-main class='d-flex justify-center'>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
<script>
import AppMenu from '@/components/AppMenu'
import router from '@/router'
import { ref, watch, onBeforeUpdate } from 'vue'

export default {
  name: 'app-main',
  components: {
    AppMenu
  },
  setup() {
    let rail = ref(true)
    let navStartState = ref(true)
    const leftPanel = ref(null)

    ////////////////////////////////////////////////////
    const header = ref('')
    const hideLeftMenu = ref(false)
    const updateRouteData = (currentRoute)=> {
      header.value = currentRoute?.meta?.header ?? ''
      hideLeftMenu.value = currentRoute?.meta?.hideLeftMenu ?? false
      navStartState.value = (currentRoute?.meta?.navStartState) === undefined ? true : !!(currentRoute?.meta?.navStartState)
    }
    watch(router.currentRoute, (e) => updateRouteData(e))
    onBeforeUpdate(() =>  updateRouteData(router.currentRoute))
    ////////////////////////////////////////////////////


    return {
      navStartState,
      header,
      hideLeftMenu,
      rail,
      leftPanel
    }
  }
}
</script>
<style lang='scss'>
//html{
//  overflow-y: hidden !important;
//}



</style>
