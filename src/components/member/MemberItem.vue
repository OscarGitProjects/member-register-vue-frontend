<template>
  <div class="container" style="margin-top: 0.25em">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ firstname }} {{ lastname }}</h5>
        <p>{{ id }}</p>
        <p>{{ address }}</p>
        <p>{{ postcode }} {{ postaladdress }}</p>
        <div>
          <router-link
            type="button"
            class="btn btn-primary btn-sm"
            title="Details"
            v-bind:to="detailsLink"
            >Details</router-link
          >
          <router-link
            type="button"
            class="btn btn-primary btn-sm"
            v-bind:to="editLink"
            title="Edit"
            >Edit</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: false },
    postcode: { type: String, required: false },
    postaladdress: { type: String, required: false },
    creationDate: { type: String, required: true },
    lastUpdatedDate: { type: String, required: false },
  },
  computed: {
    editLink() {
      return {
        name: "memberEditWithId",
        params: { memberId: this.id },
      };
    },
    detailsLink() {
      return {
        name: "memberWithId",
        params: { memberId: this.id },
      };
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 1px;
}
</style>
