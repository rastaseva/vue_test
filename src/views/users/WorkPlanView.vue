<template>
  <complex-table
    :items='tableData.items'
    :headers='tableData.headers'
    height='100vh'
    :is-loading='isLoading && tableData.items.length === 0'
    @rowClicked='(item)=>openPopup(item)'
    :row-class-formatter='tableData.rowClassFormatter'
    :func-filter='tableData.funcFilter'
    :key='tableData.listFilterStatus'
    :showHeaders='false'
    :showSearchFields='true'>
    <template #tools>
      <v-btn-group>
        <v-btn v-for='btn in journalBtns' :key='btn.header'
               :active='tableData.listFilterStatus?.header === btn.header || tableData.listFilterStatus === btn.filter'
               @click='tableData.btnClick(btn)'>
          {{ btn.header }}
        </v-btn>
      </v-btn-group>
    </template>
  </complex-table>

</template>
<script>
import ComplexTable from '@/components/ComplexTable'
import { ref } from 'vue'

export default {
  name: "work-plan",
  components: {
    ComplexTable
  },
  props: {
  },
  setup(){
    const headerFormer = function(title, key, hide = false) {
      return {
        title, align: 'center', sortable: false, key, filter: '', hide
      }
    }

    const tableData = ref({
      headers: [
        headerFormer('Адрес', 'address'),
        headerFormer('Код проблемы', 'problemCode'),
        headerFormer('Наименование работы/детали', 'type'),
        headerFormer('Начало по плану', 'startDatePlan'),
        headerFormer('Окончание по плану', 'finishDatePlan'),
        headerFormer('Начало факт.', 'startDateFact'),
        headerFormer('Окончание факт.', 'finishDateFact')
      ],
      items: [],
      rowClassFormatter: (item) => {
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
    return{
      tableData
    }
  }
}
</script>
