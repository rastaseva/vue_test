<template>
  <v-list>
    <v-list-item @click='router.push(`/`)' :append-icon='rail ? "mdi mdi-home-outline" : ""'>Главная
      <v-tooltip v-if='rail' text='Главная' activator='parent'></v-tooltip>
    </v-list-item>
  </v-list>
</template>
<script>
import router from '@/router'

export default {
  name: 'app-menu',
  props: {
    rail: { type: Boolean }
  },
  setup() {


    return {
      router
    }
  }
}
</script>
