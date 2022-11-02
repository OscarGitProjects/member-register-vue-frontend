<template>
  <div v-if="IsLoading">
    <p>Loading...</p>
  </div>
  <div class="container" style="margin-top: 0.25em" v-else>
    <form id="editMemberForm" v-on:submit.prevent="submitData">
      <div class="card">
        <div class="card-body">
          <transition>
            <message-box
              v-if="typeOfMessage > 0"
              v-bind:messageText="messageText"
              v-bind:typeOfMessage="typeOfMessage"
            ></message-box>
          </transition>

          <transition>
            <div v-if="IsUpdating">
              <h3>Updating...</h3>
            </div>
          </transition>

          <transition>
            <div v-if="IsInputInvalid">
              <h3 class="error">Invalid input</h3>
              <p class="error">Check all inputs</p>
            </div>
          </transition>

          <div v-if="member">
            <h5 class="card-title">Edit member</h5>
            <div class="row">
              <div class="col-4">
                <label for="firstname" class="form-label input-group-text"
                  >Firstname</label
                >
              </div>
              <div class="col-6">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Firstname"
                  class="form-control"
                  ref="refFirstname"
                  v-bind:value="this.member.firstname"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <label for="lastname" class="form-label input-group-text"
                  >Lastname</label
                >
              </div>
              <div class="col-6">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Lastname"
                  class="form-control"
                  ref="refLastname"
                  v-bind:value="member.lastname"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <label for="address" class="form-label input-group-text"
                  >Address</label
                >
              </div>
              <div class="col-6">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  class="form-control"
                  ref="refAddress"
                  v-bind:value="member.address"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <label for="postcode" class="form-label input-group-text"
                  >Postcode</label
                >
              </div>
              <div class="col-6">
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  placeholder="Postcode"
                  class="form-control"
                  ref="refPostcode"
                  v-bind:value="member.postcode"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <label for="postaladdress" class="form-label input-group-text"
                  >Postaladdress</label
                >
              </div>
              <div class="col-6">
                <input
                  id="postaladdress"
                  name="postaladdress"
                  type="text"
                  placeholder="Postaladdress"
                  class="form-control"
                  ref="refPostaladdress"
                  v-bind:value="member.postaladdress"
                />
              </div>
            </div>
            <div>
              <input
                id="creationDate"
                name="creationDate"
                type="hidden"
                ref="refCreationDate"
                v-bind:value="member.creationDate"
              />

              <input
                id="LastUpdatedDate"
                name="LastUpdatedDateDate"
                type="hidden"
                ref="refLastUpdatedDate"
                v-bind:value="member.lastUpdatedDate"
              />
            </div>

            <div>
              <button
                id="btnUpdateMember"
                class="btn btn-success"
                type="submit"
              >
                Update member
              </button>
            </div>
          </div>
          <div v-else>
            <h5>Can't find member</h5>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import MessageBox from "../UI/MessageBox.vue";

export default {
  mounted() {
    const memberId = this.$route.params.memberId;
    this.memberId = memberId;

    this.getMemberFromWebApi(memberId);
  },
  components: {
    "message-box": MessageBox,
  },
  data() {
    return {
      memberId: -1,
      IsInputInvalid: false,
      member: null,
      IsLoading: false,
      messageText: "",
      typeOfMessage: 0,
      IsUpdating: false,
    };
  },
  methods: {
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
          this.messageText = "Cant get information about member!";

          console.log(
            "MemberEdit.vue. getMemberFromWebApi. axios error: " + error
          );
        })
        .finally(() => {
          this.IsLoading = false;
        });
    },
    submitData() {
      const enteredFirstName = this.$refs.refFirstname.value;
      const enteredLastName = this.$refs.refLastname.value;
      const enteredAddress = this.$refs.refAddress.value;
      const enteredPostCode = this.$refs.refPostcode.value;
      const enteredPostAddress = this.$refs.refPostaladdress.value;
      const creationDate = this.$refs.refCreationDate.value;
      const lastUpdatedDate = this.$refs.refLastUpdatedDate.value;

      // Validat input
      if (
        enteredFirstName.trim() === "" ||
        enteredLastName.trim() === "" ||
        enteredAddress.trim() === "" ||
        enteredPostCode.trim() === "" ||
        enteredPostAddress.trim() === ""
      ) {
        this.IsInputInvalid = true;
        return;
      }

      // We have valid input. Update information about member
      this.updateMember({
        id: this.memberId,
        firstname: enteredFirstName,
        lastname: enteredLastName,
        address: enteredAddress,
        postcode: enteredPostCode,
        postaladdress: enteredPostAddress,
        creationDate: creationDate,
        lastUpdatedDate: lastUpdatedDate,
      });
    },
    async updateMember(updatedMember) {
      this.IsLoading = false;
      this.IsUpdating = true;
      this.typeOfMessage = 0;

      // Call webapi
      await axios
        .put(
          this.$hostName + "/UpdateMember/" + updatedMember.id,
          updatedMember
        )
        .then(() => {
          //console.log("response: " + response);

          this.$router.push("/members");
        })
        .catch((error) => {
          this.typeOfMessage = 2;
          this.messageText = "Can't update member!";

          console.log("MemberEdit.vue. updateMember. axios error: " + error);
        })
        .finally(() => {
          this.IsSaving = false;
          this.IsUpdating = false;
        });
    },
  },
};
</script>
