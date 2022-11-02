<template>
  <div v-if="IsLoading">
    <p>Loading...</p>
  </div>
  <div class="container" style="margin-top: 0.25em" v-else>
    <div class="card">
      <div class="card-body">
        <transition>
          <message-box
            v-if="typeOfMessage > 0"
            v-bind:messageText="messageText"
            v-bind:typeOfMessage="typeOfMessage"
          ></message-box>
        </transition>

        <div v-if="member">
          <h5 class="card-title">Details</h5>
          <h5>{{ member.firstname }} {{ member.lastname }}</h5>
          <p>Address: {{ member.address }}</p>
          <p>Post address: {{ member.postcode }} {{ member.postaladdress }}</p>
          <p>Created date: {{ member.creationDate }}</p>
          <p>Latest updated date: {{ member.lastUpdatedDate }}</p>
          <div>
            <router-link
              type="button"
              class="btn btn-primary btn-sm"
              v-bind:to="editLink"
              title="Edit"
              >Edit</router-link
            >
            <button
              type="button"
              class="btn btn-danger btn-sm"
              title="Delete"
              v-on:click="deleteMember(member.id)"
            >
              Delete
            </button>
          </div>
        </div>
        <div v-else>
          <h5>Can't find member</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MessageBox from "../UI/MessageBox.vue";

export default {
  components: {
    "message-box": MessageBox,
  },
  data() {
    return {
      member: null,
      IsLoading: false,
      messageText: "",
      typeOfMessage: 0,
    };
  },
  computed: {
    detailsLink() {
      return {
        name: "memberWithId",
        params: { memberId: this.member.id },
      };
    },
    editLink() {
      return {
        name: "memberEditWithId",
        params: { memberId: this.member.id },
      };
    },
  },
  //created()
  mounted() {
    const memberId = this.$route.params.memberId;
    this.getMemberFromWebApi(memberId);
  },
  methods: {
    async deleteMember(memberId) {
      this.typeOfMessage = 0;

      await axios
        .delete(this.$hostName + "/DeleteMember/" + memberId)
        .then(() => {
          //console.log("MemberDetail.vue. Deleted a member");
          this.$router.push("/members");
        })
        .catch((error) => {
          this.typeOfMessage = 2;
          this.messageText = "Can't delete member with id:" + memberId + "!";

          console.log(
            "MemberDetail.vue. deleteMember. Can't delete member with id:" +
              memberId +
              ". axios error: " +
              error
          );
        })
        .finally(() => {});
    },
    async getMemberFromWebApi(memberId) {
      this.IsLoading = true;
      this.member = null;
      this.typeOfMessage = 0;

      // "https://localhost:7084/api/MemberRegister/GetMember/"
      await axios
        .get(this.$hostName + "/GetMember/" + memberId)
        .then((response) => {
          /*           console.log(
            "getMemberFromWebApi. axios got response. " +
              JSON.stringify(response)
          ); */

          this.member = {
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            address: response.data.address,
            postcode: response.data.postcode,
            postaladdress: response.data.postaladdress,
            creationDate: response.data.creationDate,
            lastUpdatedDate: response.data.lastUpdatedDate,
          };
        })
        .catch((error) => {
          this.typeOfMessage = 2;
          this.messageText = "Can't get information about member!";

          console.log(
            "MemberDetail.vue. getMemberFromWebApi. axios error: " + error
          );
        })
        .finally(() => {
          this.IsLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 1px;
}
</style>
