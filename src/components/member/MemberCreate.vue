<template>
  <div class="container" style="margin-top: 0.25em">
    <form id="newMemberForm" v-on:submit.prevent="submitData">
      <div class="card">
        <div class="card-body">
          <message-box
            v-if="typeOfMessage > 0"
            v-bind:messageText="messageText"
            v-bind:typeOfMessage="typeOfMessage"
          ></message-box>

          <div v-if="IsSaving">
            <h3>Saving...</h3>
          </div>

          <div v-if="IsInputInvalid">
            <h3 class="error">Invalid input</h3>
            <p class="error">Check all inputs</p>
          </div>

          <h5 class="card-title">Create new member</h5>
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
              />
            </div>
          </div>
          <div>
            <button id="btnSaveMember" class="btn btn-success" type="submit">
              Save new member
            </button>
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
  components: {
    "message-box": MessageBox,
  },
  data() {
    return {
      IsInputInvalid: false,
      messageText: " ",
      typeOfMessage: 0,
      IsSaving: false,
    };
  },
  methods: {
    submitData() {
      const enteredFirstName = this.$refs.refFirstname.value;
      const enteredLastName = this.$refs.refLastname.value;
      const enteredAddress = this.$refs.refAddress.value;
      const enteredPostCode = this.$refs.refPostcode.value;
      const enteredPostAddress = this.$refs.refPostaladdress.value;

      this.IsInputInvalid = false;

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

      // We have valid input. Create a new member
      this.addNewMember(
        enteredFirstName,
        enteredLastName,
        enteredAddress,
        enteredPostCode,
        enteredPostAddress
      );
    },

    async addNewMember(firstName, lastName, address, postCode, postAddress) {
      const newMember = {
        firstname: firstName,
        lastname: lastName,
        address: address,
        postcode: postCode,
        postaladdress: postAddress,
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
      };

      this.IsSaving = true;
      this.typeOfMessage = 0;

      // Call webapi
      await axios
        .post(this.$hostName + "/CreateMember/", newMember)
        .then(() => {
          //console.log("response: " + response);

          this.$router.push("/members");
        })
        .catch((error) => {
          this.typeOfMessage = 2;
          this.messageText = "Can't create a new member!";

          console.log("MemberCreate.vue. addNewMember. axios error: " + error);
        })
        .finally(() => {
          this.IsSaving = false;
        });
    },
  },
};
</script>
