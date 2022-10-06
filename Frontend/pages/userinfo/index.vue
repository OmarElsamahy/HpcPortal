<template>
  <div>
    <TheNavbar />
    <div class="container">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-md-12">
          <h1 class="display-4">User Info</h1>
          <table class="course-list-row table table-hover">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ user.userfirstname }}</td>
                <td>{{ user.userlastname }}</td>
                <td>{{ user.useremail }}</td>
                <td>{{ user.userrole }}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-primary btn-outline-secondary"
            @click="changePassword(user.useremail)"
            type="button"
          >
            Change Password
          </button>
          <button
            v-if="user.userrole == 'admin'"
            class="btn btn-primary btn-outline-secondary"
            @click="gotoadmin()"
            type="button"
          >
            Go To Admin Page
          </button>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TheNavbar from "../../components/theNavbar.vue";
export default {
  head() {
    return {
      title: 'ENHPCG/User',
    }
  },
  mounted: async function () {
    if (this.$store.state.status) {
      await this.getUser();
    } else {
      this.$router.push("/signin");
    }
  },
  data: function () {
    return {
      user: [],
    };
  },
  methods: {
    async getUser() {
      this.user = this.$store.state.user;
    },
    gotoadmin() {
      this.$router.push("/admin");
      return true;
    },
    changePassword() {
      this.$router.push("/passwordreset");
      return true;
    },
  },
  components: { TheNavbar },
};
</script>

<style></style>
