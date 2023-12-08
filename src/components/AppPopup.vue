<template>
  <v-dialog
      transition="dialog-top-transition"
      :model-value="modelValue"
      @update:model-value="(newVal)=>change(newVal)"
      :fullscreen="true"
  >
    <template v-slot:default>
      <v-card>
        <v-toolbar
            color="primary"
        >
          <v-toolbar-title>{{ header }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                icon
                @click="change(false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="buttons"></slot>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'app-popup',
  props: {
    header: {type: String, default: 'Меню'},
    modelValue: {type: Boolean }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const change = (newVal)=>{
      emit('update:modelValue', newVal);
    }

    return {
      change
    }
  }
}
</script>
