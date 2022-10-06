<template>
  <div class="card card-outline-secondary">
    <div class="card-header">
      <h3 class="mb-0">Change Password</h3>
    </div>
    <div class="card-body">
      <form class="form" @submit.prevent="confirmPassword">
        <div v-if="credentialserr" class="alert alert-danger" role="alert">
          User Credentials Incorrect
        </div>
        <div class="form group">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            v-model="email"
            required
          />
        </div>
        <div v-if="emailerr" class="alert alert-danger" role="alert">
          Email Format Incorrect
        </div>
        <div class="form-group">
          <label for="inputPasswordOld">Current Password</label>
          <input
            type="password"
            v-model="currentpassword"
            class="form-control"
            id="inputPasswordOld"
            required=""
          />
        </div>
        <div v-if="oldpassworderr" class="alert alert-danger" role="alert">
          Password Incorrect
        </div>
        <div class="form-group">
          <label for="inputPasswordNew">New Password</label>
          <input
            type="password"
            class="form-control"
            v-model="newpassword"
            id="inputPasswordNew"
            required=""
          />
        </div>
        <div v-if="newpassworderr" class="alert alert-danger" role="alert">
          Password format incorrect
        </div>
        <div class="form-group">
          <label for="inputPasswordNewVerify">Verify Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPasswordNewVerify"
            required=""
            v-model="verifypassword"
          />
        </div>
        <div v-if="verifypassworderr" class="alert alert-danger" role="alert">
          Two Passwords must be equal
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success btn-lg float-right">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: 'ENHPCG/Password Reset',
    }
  },
  data() {
    return {
      email: "",
      currentpassword: "",
      newpassword: "",
      verifypassword: "",
      emailerr: "",
      credentialserr: false,
      oldpassworderr: false,
      newpassworderr: false,
      verifypassworderr: false,
    };
  },
  methods: {
    async checkDuplicateEmail() {
      try {
        let url = `http://192.168.15.205:8080/api/test/user?useremail=${this.email}`;
        let res = await axios.get(url);
        this.credentialserr = false;
        return false;
      } catch (err) {
        this.credentialserr = true;
        return true;
      }
    },
    validate() {
      this.credentialserr = false;
      if (this.currentpassword.length < 8) {
        this.oldpassworderr = true;
      } else {
        this.oldpassworderr = false;
      }
      if (this.newpassword.length < 8) {
        this.newpassworderr = true;
      } else {
        this.newpassworderr = false;
      }
      if (this.verifypassword != this.newpassword) {
        this.verifypassworderr = true;
      } else {
        this.verifypassworderr = false;
      }
      if (
        String(this.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.emailerr = false;
      } else {
        this.emailerr = true;
      }
      if (
        this.emailerr == false &&
        this.oldpassworderr == false &&
        this.newpassworderr == false &&
        this.verifypassworderr == false
      ) {
        return true;
      } else {
        return false;
      }
    },
        async signout() {
      if (this.$store.state.status) {
        let token = this.$auth.strategy.token.get();
        await axios.post(  //// link 1
          "http://192.168.15.205:8080/api/auth/signout",
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authentication: token,
            },
          }
        );
        this.$auth.$storage.removeUniversal("email");
        this.$auth.$storage.removeUniversal("token");
        await this.$auth.logout();
        this.$store.commit("setLoggedOut");
        this.$store.commit("removeUser");
        this.$router.push("/signin");
      } else {
        return true;
      }
    },
    async confirmPassword() {
      try {
        if (!this.validate()) {
          return false;
        }
        if (!this.checkDuplicateEmail()) {
          return false;
        }
        let url = "http://192.168.15.205:8080/api/auth/resetpassword";
        let token = this.$auth.strategy.token.get();
        let res = await axios({
          method: "put",
          url: url,
          data: {
            useremail: this.email,
            newpassword: this.newpassword,
            userpassword: this.currentpassword,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        await this.signout();
        this.$router.push("/signin");
        return true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
