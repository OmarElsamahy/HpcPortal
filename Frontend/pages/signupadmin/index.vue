<template>
  <div>
    <theNavbar />

    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form @submit.prevent="signupadmin">
            <h1>Add Admin To ENHPCG Portal</h1>
            <br />
            <br />

            <div class="mb-3">
              <label for="First Name" class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                id="firstname"
                aria-describedby="emailHelp"
                v-model="fname"
                required
              />
            </div>

            <div class="mb-3">
              <label for="Last Name" class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                aria-describedby="emailHelp"
                v-model="lname"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div v-if="emailerr" class="alert alert-danger" role="alert">
              Email Incorrect
            </div>

            <div v-if="emailduperr" class="alert alert-danger" role="alert">
              Email Already Exists
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
            </div>
            <div v-if="passworderr" class="alert alert-danger" role="alert">
              Password Must be 8 characters at least
            </div>

            <div class="mb-3">
              <label for="repassword" class="form-label"
                >Confirm Password</label
              >
              <input
                type="password"
                class="form-control"
                id="repassword"
                v-model="repassword"
              />
            </div>
            <div v-if="repassworderr" class="alert alert-danger" role="alert">
              Two passwords Must Match
            </div>
            <v-btn type="submit" class="btn btn-primary">Submit</v-btn>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import theNavbar from "../../components/theNavbar.vue";
import axios from "axios";
export default {
  head() {
    return {
      title: 'ENHPCG/Sign Up Admin',
    }
  },
  mounted: async function () {
    if (
      this.$store.state.status &&
      this.$store.state.user.userrole == "admin"
    ) {
      return true;
    } else {
      this.$router.push("/signin");
    }
  },
  data: () => {
    return {
      email: "",
      password: "",
      fname: "",
      lname: "",
      repassword: "",
      emailerr: false,
      emailduperr: false,
      passworderr: false,
      repassworderr: false,
    };
  },
  components: { theNavbar },
  methods: {
    async checkDuplicateEmail() {
      try {
        let url = `http://192.168.15.205:8080/api/test/user?useremail=${this.email}`;
        let res = await axios.get(url);
        this.emailduperr = true;
        return false;
      } catch (err) {
        this.emailduperr = false;
        return true;
      }
    },
    validate() {
      if (this.password.length < 8) {
        this.passworderr = true;
      } else {
        this.passworderr = false;
      }
      if (this.repassword != this.password) {
        this.repassworderr = true;
      } else {
        this.repassworderr = false;
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
        this.passworderr == false &&
        this.emailerr == false &&
        this.repassworderr == false
      ) {
        return true;
      } else {
        return false;
      }
    },
    async signupadmin() {
      try {
        if (!this.validate()) {
          return;
        }
        if (!this.checkDuplicateEmail()) {
          return;
        }
        let token = this.$auth.strategy.token.get();
        const api = "http://192.168.15.205:8080/api/auth/signupadmin";
        let res = await axios.post(
          api,
          {
            adminfirstname: this.fname,
            adminlastname: this.lname,
            adminemail: this.email,
            adminpassword: this.password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authentication: token,
            },
          }
        );
        this.$router.push("/admin");
      } catch (err) {
        this.emailduperr = true;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
