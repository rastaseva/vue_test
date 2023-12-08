<template>

  <complex-table
    :items='tableData.items'
    :headers='tableData.headers'
    height='83vh'
    :is-loading='isLoading && tableData.items.length === 0'
    @rowClicked='(item)=>openPopup(item)'
    :row-class-formatter='tableData.rowClassFormatter'
    :func-filter='tableData.funcFilter'
    :showHeaders='true'
    :showSearchFields='true'>
    <template #tools>
      <v-slide-group v-model='a' :center-active='true'>
        <v-slide-group-item v-for='btn in journalBtns' :key='btn.header' v-slot='{ toggle }'>
          <v-btn

            class='ma-2'
            :active='tableData.listFilterStatus?.header === btn.header || tableData.listFilterStatus === btn.filter'
            @click='tableData.btnClick(btn) && toggle()'>
            {{ btn.header }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>

    </template>
  </complex-table>


  <app-popup v-model='isPopupOpen' header='Меню пользователя'>
    <template #content>
      <btn-list :list='popUpIcons' @buttonClick='(btn)=>btn?.action()'></btn-list>
    </template>
  </app-popup>

</template>

<script>
/* eslint-disable */
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppPopup from '@/components/AppPopup'
import BtnList from '@/components/BtnList'
import { useRouter } from 'vue-router'
import ComplexTable from '@/components/ComplexTable'

export default {
  name: 'HomeView',
  components: {
    AppPopup,
    BtnList,
    ComplexTable
  },
  setup() {

    const store = useStore()
    const router = useRouter()

    const list = computed(() => store.getters[`usersList/list`])

    const headerFormer = function(title, key, hide = false) {
      return {
        title, align: 'center', sortable: false, key, filter: '', hide
      }
    }

    const tableData = ref({
      headers: [
        headerFormer('Имя', 'name'),
        headerFormer('Никнейм', 'username'),
        headerFormer('Емэйл', 'email'),
        headerFormer('Телефон', 'phone'),
        headerFormer('Сайт', 'website')],
      items: list,
      rowClassFormatter: (item) => {
        if (!item.title) {
          switch (item.status) {
            case 'Новая':
              return 'new'
            case 'Выполняется':
              return 'executing'
            case 'Назначена':
              return 'assigned'
            case 'Завершена бригадой':
              return 'done'
            case 'Закрыта в РВ':
              return 'closed'
            default:
              return ''
          }
        } else {
          switch (item.title) {
            case 'Адрес':
              return 'wide'
            default:
              return ''
          }
        }


      },
      listFilterStatus: null,
      btnClick: (btn) => {
        if (btn.filter === null) {
          tableData.value.listFilterStatus = null
        } else {
          tableData.value.listFilterStatus?.header === btn.header ? tableData.value.listFilterStatus = null : tableData.value.listFilterStatus = btn
        }
      },
      funcFilter: (item) => tableData.value.listFilterStatus === null
        ? true
        : 'filterFunc' in tableData.value.listFilterStatus
          ? tableData.value.listFilterStatus.filterFunc(item)
          : item.status === tableData.value.listFilterStatus.filter
    })


    store.dispatch('usersList/GET_LIST')
    ////////////////////////////////////////////////
    const selectedItem = ref(null)

    let popUpIcons = ref([
      { icon: 'mdi-open-in-app', desc: 'Открыть', action: () => router.push(`/users/${selectedItem.value?.id}/`) }
    ])

    return {
      list,
      isLoading: computed(() => store.getters[`usersList/isLoading`]),

      //////////////popup///////////
      isPopupOpen: ref(false),
      popUpIcons,
      openPopup: function(item) {
        selectedItem.value = item
        this.isPopupOpen = true
      },
      /////////////popup///////////

      tableData,
      a: ref(1)
    }
  }
}
</script>
<style lang='scss'>
.v-data-table-footer > *:first-child {
  width: 100%;
}

</style>
