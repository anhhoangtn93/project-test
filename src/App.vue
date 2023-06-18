<template>
  <component :is="layout">
    <v-app>
        <router-view v-model:layout="layout" />
        <dialog-component></dialog-component>
    </v-app>
  </component>
</template>

<script>
import DialogComponent from '@/components/DialogComponent.vue'
export default {
  name: `App`,
  components: {
    DialogComponent
  },
  data() {
    return {
      layout: `div`,
    };
  },
};
</script>