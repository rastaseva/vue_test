<template>
  <v-data-table
    :items-per-page='25'
    :headers='headers'
    :items='filteredItems'
    hide-default-footer
    dense
    :height='height'
    class='elevation-1'
    :loading='isLoading'
  >
    <template #headers>
      <tr v-if='showHeaders'>
        <td v-for='header in actveHeaders' :class='rowClassFormatter(header) + " text-center table-cell " + activeStyle'
            :key='header.title'>
          <p>{{ header.title }}</p>
        </td>
      </tr>
      <tr v-if='showSearchFields' class='table-header'>
        <td v-for='(header) in actveHeaders' :key='header.title' class='table-cell'>
          <v-text-field v-model='filterArr[header.key]' type='text' variant='solo' :label='header.title'
                        :disabled='isLoading || !header.title' :clearable='true'></v-text-field>
        </td>
      </tr>
    </template>
    <template #item='{item}'>

      <tr class='text-truncate' @click="$emit('rowClicked', item)" :class='rowClassFormatter(item)'>
        <td v-for='header in actveHeaders' class='table-cell text-center' :key='header.title'
        >
          <div v-if='typeof item[header.key] === "object"' class='d-flex flex-row justify-center'>
            <template v-if="item[header.key]?.type === 'icons' && item[header.key].icons.length > 0">
              <v-icon v-for='icon in item[header.key].icons' :key='icon' size='32'>{{ icon }}</v-icon>
            </template>
            <template v-else>
              —
            </template>
          </div>
          <div v-else class='text-truncate' style='user-select: none'>
            {{ `${item[header.key] ?? ''}` }}
          </div>
        </td>
      </tr>
    </template>
    <template #[`footer.prepend`]>
      <div class='flex-grow-1'>
        <slot name='tools'></slot>
      </div>
    </template>
  </v-data-table>
</template>
<script>
/*eslint-disable*/
import { computed, ref, watch } from 'vue'

export default {
  name: 'complex-table',
  props: {
    headers: { type: Object },
    items: { type: Array },
    isLoading: { type: Boolean, default: false },
    height: { type: String, default: 'auto' },
    rowClassFormatter: { type: Function, default: () => '' },
    funcFilter: { type: Function, default: () => (() => true) },
    showHeaders: { type: Boolean, default: true },
    showSearchFields: { type: Boolean, default: true }
  },
  emits: ['rowClicked'],
  setup(props) {


    ///////////////////////////////////////////////////////////////
    const genFilterObj = () => props.headers.reduce((a, e) => {
      a[e.key] = ''
      return a
    }, {})
    const filterArr = ref(genFilterObj())

    watch(props.headers, () => {
      filterArr.value = props.headers.reduce(genFilterObj())
    })
    ///////////////////////////////////////////////////////////////

    const filteredItems = computed(() => {
      console.log('list recalculated')
      let arr = [...props.items]


      arr = arr.filter(item => {

        if (props.funcFilter(item)) {
          for (let i = 0; i < props.headers.length; i++) {
            const header = props.headers[i], val = item[header.key]
            if (typeof val === 'object' && val !== null) {
              // логика для фильтрации объектов (пока все подпадают под выборку)
            } else {
              const isIncludes = `${item[header.key]}`.toLowerCase().includes(filterArr.value[header.key] === null ? '' : filterArr.value[header.key].toLowerCase())
              if (!isIncludes) return false
            }
          }
          return true
        } else return false
      })

      return arr
    })


    return {
      filteredItems,
      actveHeaders: computed(() => props.headers.filter((h) => !h.hide)),
      log: (e) => console.log(e),
      filterArr,
    }
  }
}
</script>
<style lang='scss' scoped>
.table-header {
  position: sticky;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, #e0dac1 0%, rgba(255, 255, 255, 1) 4%, rgba(255, 255, 255, 1) 100%);
  top: 0;
  z-index: 1;
}

.table-cell {
  max-width: 25vw;
  min-width: max(10vw, 200px);
  background-color: unset !important;
  user-select: none;

  &__header {
    max-width: 25vw;
    min-width: 25vw
  }

}

.wide {
  min-width: max(15vw, 325px);
}
.new {
  background-color: #FFFFFF;
}

.executing {
  background-color: #aacbd9;
}

.assigned {
  background-color: #FFF8DC;
}

.done {
  background-color: #cee0c0;
}

.closed {
  background-color: #C8C8C8;
}
</style>
