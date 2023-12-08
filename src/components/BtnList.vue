<template>
  <div class="modal-buttons">
    <v-btn v-for="button in list" :key="button.desc" @click="$emit('buttonClick', button)" :disabled="!(button.action)" size="auto" class="modal-buttons__button">
      <template v-slot:prepend>
        <v-icon size="50">{{ button.icon }}</v-icon>
      </template>
      <span>{{ button.desc }}</span>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "Btn-List",
  props: {
    list: {type: Array, default: () => []}
  },
  emits: ['buttonClick']
}
</script>
<style scoped lang="scss">
.modal-buttons {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;


  @media (max-width: 452px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &__button {
    flex-direction: column;
    display: flex;
    gap: 6px;
    padding: 20px !important;
    font-size: 10px;
  }

  span {
    white-space: break-spaces;
  }
}
</style>
