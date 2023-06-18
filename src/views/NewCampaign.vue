<template>
  <div class="newCampaign">
    <v-row justify="center" class="mt-10">Interview candidate: Bui Anh Hoang</v-row>
    <v-row justify="center" class="mt-10">
      <v-btn color="primary" @click="this.openDialog()">
        New Campaign
      </v-btn>
    </v-row>

  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: "NewCampaign",
  data() {
    return {
      primary: true, // Định nghĩa thuộc tính "primary"
    };
  },
  computed: {
    ...mapState("modal", {
      isShowModal: state => state.isShowModal
    })
  },
  methods: {

    ...mapActions({
      setShowModal: "modal/setShowModal",
    }),
    openDialog() {
      this.setShowModal();
    }
  }
};
</script>