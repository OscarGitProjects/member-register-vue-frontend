<template>
  <transition>
    <message-box
      v-if="typeOfMessage > 0"
      v-bind:messageText="messageText"
      v-bind:typeOfMessage="typeOfMessage"
    ></message-box>
  </transition>

  <transition>
    <div v-if="IsLoading">
      <p>Loading...</p>
    </div>
  </transition>

  <div v-if="IsLoading === false">
    <div v-if="members && members.length > 0">
      <member-item
        v-for="member in members"
        v-bind:key="member.id"
        v-bind:id="member.id"
        v-bind:firstname="member.firstname"
        v-bind:lastname="member.lastname"
        v-bind:address="member.address"
        v-bind:postcode="member.postcode"
        v-bind:postaladdress="member.postaladdress"
        v-bind:creationDate="member.creationDate"
        v-bind:lastUpdatedDate="member.lastUpdatedDate"
      >
      </member-item>
    </div>
    <div v-else>
      <p>No members</p>
    </div>
  </div>
</template>

<script>
import MemberItem from "./MemberItem.vue";
import MessageBox from "../UI/MessageBox.vue";
import axios from "axios";

export default {
  mounted() {
    this.getMembersFromWebApi();
  },
  data() {
    return {
      members: [],
      IsLoading: false,
      messageText: "",
      typeOfMessage: 0,
    };
  },
  components: {
    "member-item": MemberItem,
    "message-box": MessageBox,
  },
  methods: {
    async getMembersFromWebApi() {
      this.IsLoading = true;
      this.members.length = 0;

      // "https://localhost:7084/api/MemberRegister/GetMembers"
      await axios
        .get(this.$hostName + "/GetMembers")
        .then((response) => {
          for (let index in response.data) {
            const newMember = {
              id: response.data[index].id,
              firstname: response.data[index].firstname,
              lastname: response.data[index].lastname,
              address: response.data[index].address,
              postcode: response.data[index].postcode,
              postaladdress: response.data[index].postaladdress,
              creationDate: response.data[index].creationDate,
              lastUpdatedDate: response.data[index].lastUpdatedDate,
            };

            this.members.push(newMember);
          }
        })
        .catch((error) => {
          this.typeOfMessage = 2;
          this.messageText = "Can't read members!";

          console.log(
            "MemberList.vue. getMembersFromWebApi. axios error: " + error
          );
        })
        .finally(() => {
          this.IsLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
