<template>
  <div>
    <theNavbar />

    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h1>Sign in To ENHPCG Portal</h1>
          <br />
          <br />
          <form @submit.prevent="signIn">
            <div v-if="errflag" class="alert alert-danger" role="alert">
              Incorrect Email Or Password / Not Confirmed By Admin Yet
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Email address</label
              >
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div v-if="emailerr" class="alert alert-danger" role="alert">
              Email must contain @ and be at least 8 characters
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Password</label
              >
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

            <v-btn type="submit" class="btn btn-primary">Submit</v-btn>
            <router-link :to="{ name: 'passwordreset' }"
              >Forgot / Reset Password</router-link
            >
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import theNavbar from "../../components/theNavbar.vue";
export default {
  head() {
    return {
      title: 'ENHPCG/Sign In',
    }
  },
  mounted: async function () {
    if (this.$store.state.status) {
      this.$router.push('/');
    } 
  },
  data() {
    return {
      email: null,
      password: null,
      emailerr: false,
      passworderr: false,
      errflag: false,
    };
  },
  components: { theNavbar },
  methods: {
    validate() {
      this.errflag = false;
      if (this.password.length < 8) {
        this.passworderr = true;
      } else {
        this.passworderr = false;
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

      if (this.passworderr == false && this.emailerr == false) {
        return true;
      } else {
        return false;
      }
    },
    async signIn() {
      try {
        if (!this.validate()) {
          return;
        }
        let res = await this.$auth.loginWith("local", {
          data: {
            useremail: this.email,
            userpassword: this.password,
          },
        });
        this.$auth.$storage.setUniversal("email", res.data.useremail);
        this.$auth.$storage.setUniversal("token", res.data.token);
        let user = {
          userfirstname: res.data.userfirstname,
          userlastname: res.data.userlastname,
          useremail: res.data.useremail,
          userpassword: res.data.userpassword,
          userrole: res.data.userrole,
        };
        this.$auth.strategy.token.set(res.data.token);
        this.$auth.setUser(user);

        this.$store.commit("setUser", user);
        this.$store.commit("setLoggedIn");

        let redirect_url = "";
        if (user.userrole == "admin") {
          redirect_url = "/admin";
          this.$router.push(redirect_url);
        } else {
          redirect_url = "https://192.168.15.201:4443";
          location.href = redirect_url;
        }

      } catch (err) {
        this.errflag = true;
      }
    },
  },
};
</script>

<style scoped></style>
