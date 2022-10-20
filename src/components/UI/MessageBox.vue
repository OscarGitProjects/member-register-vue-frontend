<template>
  <div class="container" style="margin-top: 0.25em">
    <div v-bind:class="boxStyle" role="alert">
      <h3>{{ messageText }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messageText: { type: String, required: true },
    typeOfMessage: { type: Number, required: true },
  },
  computed: {
    boxStyle() {
      if (this.typeOfMessage == 1) {
        return "alert alert-success";
      } else if (this.typeOfMessage == 2) {
        return "alert alert-danger";
      }

      return "alert alert-success";
    },
  },
};
</script>

<style scoped></style>
