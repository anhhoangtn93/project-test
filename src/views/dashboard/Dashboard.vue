<template>
  <dynamic-layout>
    <v-card>
      <v-card-title>
        {{ $t("dashboard-page") }}
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        dashboard view
      </v-card-text>
    </v-card>
  </dynamic-layout>
</template>

<script>
import DynamicLayout from "@/views/layouts/DynamicLayout";

export default {
  name: "HomePage",
  components: { DynamicLayout },

  props: {
    msg: String,
  },
};
</script>
