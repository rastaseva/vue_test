<template>
  <v-card class='common_info d-flex flex-column justify-space-around mt-5 mb-5' title='Исполнитель'>
    <v-select
      :clearable='true'
      label='Фильтр по РВ'
      :items="['Пример: 1', 'Пример: 2', 'Пример: 3', 'Пример: 4', 'Пример: 5', 'Пример: 6']"
      variant='outlined'
    ></v-select>
    <v-select
      :clearable='true'
      label='Бригада'
      :items="['Пример: 1', 'Пример: 2', 'Пример: 3', 'Пример: 4', 'Пример: 5', 'Пример: 6']"
      variant='outlined'
    ></v-select>
    <div>
      <p>Мастер</p>
      <v-text-field class='input_text' placeholder='Мастер'
                    variant='outlined'></v-text-field>
    </div>
    <div>
      <p>Телефон мастера</p>
      <v-text-field variant='outlined' placeholder='Телефон мастера'>
      </v-text-field>
    </div>
  </v-card>
</template>
<script>

export default {
  name: 'work-tech',
}
</script>
