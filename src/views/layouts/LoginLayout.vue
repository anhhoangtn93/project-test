<template>
  <v-app class="login-layout">
    <v-main class="bg-grey-lighten-3">
      <v-container fluid>
        <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: `LoginLayout`,
};
</script>