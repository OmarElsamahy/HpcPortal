<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>ENHPCG</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'index' }"
            ><b-button size="sm" class="my-2 my-sm-0"
              >Home</b-button
            ></router-link
          >
          <br />
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'signin' }"
            v-if="activeUser == null"
            ><b-button size="sm" class="my-2 my-sm-0"
              >Sign In</b-button
            ></router-link
          >
          <br />
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'signup' }"
            v-if="activeUser == null"
            ><b-button size="sm" class="my-2 my-sm-0"
              >Sign Up</b-button
            ></router-link
          >
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'userinfo' }"
            v-else
            ><b-button size="sm" class="my-2 my-sm-0">{{
              activeUser
            }}</b-button></router-link
          >
          <br />
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'events' }"
            ><b-button size="sm" class="my-2 my-sm-0"
              >Events</b-button
            ></router-link
          >
          <br />

          
          <br />
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'about' }"
            ><b-button size="sm" class="my-2 my-sm-0"
              >About Us</b-button
            ></router-link
          >
          <br />
          <router-link
            router-tag="li"
            style="color: white; padding: 5px"
            :to="{ name: 'contact' }"
            ><b-button size="sm" class="my-2 my-sm-0"
              >Contact Us</b-button
            ></router-link
          >
          <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>Grid Resources</em>
            </template>
            <b-dropdown-item @click="gotoHardware"> 
            Resources
           </b-dropdown-item>

           <b-dropdown-item @click="gotoSoftware"> 
           Software
           </b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em></em>
            </template>
            <b-dropdown-item @click="userdetails">Profile</b-dropdown-item>
            <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      activeUser: null,
    };
  },
  mounted: async function () {
    this.checkUser();
  },
  methods: {
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
    checkUser() {
      try {
        if (this.$store.state.status) {
          this.activeUser = this.$auth.$storage.getUniversal("email");
          return true;
        } else {
          this.activeUser = null;
          return false;
        }
      } catch (err) {}
    },
    userdetails() {
      if (this.$store.state.status) {
        this.$router.push("/userinfo");
        return true;
      } else {
        this.$router.push("/signin");
      }
    },
    gotoHardware() {
      this.$router.push('/clusters');
    },
    gotoSoftware() {
      this.$router.push('/modules');
    }
  },
};
</script>

<style scoped></style>
