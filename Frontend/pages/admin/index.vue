<template>
  <div>
    <TheNavbar />
    <div class="container">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-md-12">
          <h1 class="display-4">{{ activeList }}</h1>
          <table class="course-list-row table table-hover">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">State</th>
                <th scope="col">Change State</th>
                <th scope="col">Change Role</th>
                <th scope="col">Delete User</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.userfirstname }}</td>
                <td>{{ user.userlastname }}</td>
                <td>{{ user.useremail }}</td>
                <td>{{ user.userrole }}</td>
                <td v-if="user.userstate==true">Active</td>
                <td v-else>Inactive</td>
                <td>
                  <button
                    class="btn btn-primary btn-outline-secondary"
                    @click="toggle_state(user.useremail)"
                    type="button"
                  >
                    Change State
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-primary btn-outline-secondary"
                    @click="toggle_role(user.useremail)"
                    type="button"
                  >
                    Change Role
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-primary btn-outline-secondary"
                    @click="delete_user(user.useremail)"
                    type="button"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input
                type="radio"
                name="options"
                id="option1"
                @click="getUsers()"
                autocomplete="off"
                checked
              />All Users
            </label>
            <label class="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option2"
                @click="getAcceptedUsers()"
                autocomplete="off"
              />
              Accepted Users Only
            </label>
            <label class="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option3"
                @click="getUnacceptedUsers()"
                autocomplete="off"
              />
              Unaccepted Users Only
            </label>
            <label class="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option4"
                @click="addAdmin()"
                autocomplete="off"
              />
              Add Admin
            </label>
            <label class="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option4"
                @click="viewClusters()"
                autocomplete="off"
              />
              View Clusters
            </label>
            <label class="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option4"
                @click="pbsAdminControl()"
                autocomplete="off"
              />
              Pbs Admin Control
            </label>
          </div>
        </div>
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
      title: 'ENHPCG/Admin Panel',
    }
  },
  mounted: async function () {
    if (this.$store.state.status) {
      await this.getUsers();
    } else {
      this.$router.push("/");
    }
  },
  data: function () {
    return {
      message: "User List Row",
      users: [],
      activeList: "",
    };
  },
  methods: {
    async getUsers() {
      try {
        let token = this.$auth.strategy.token.get();
        const url = "http://192.168.15.205:8080/api/test/all";
        let res = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        this.users = res.data;
        this.activeList = "All Users";
      } catch (err) {
        console.log(err);
        this.$router.push("/signin");
      }
    },
    async getAcceptedUsers() {
      let token = this.$auth.strategy.token.get();
      const url = "http://192.168.15.205:8080/api/test/allaccepted";
      let res = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      this.users = res.data;
      this.activeList = "Accepted Users";
    },
    async getUnacceptedUsers() {
      let token = this.$auth.strategy.token.get();
      const url = "http://192.168.15.205:8080/api/test/allunaccepted";
      let res = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      this.users = res.data;
      this.activeList = "Unaccepted Users";
    },
    async toggle_state(useremailtotoggle) {
      let token = this.$auth.strategy.token.get();
      const url = "http://192.168.15.205:8080/api/test/adminChangeState";
      let res = await axios({
        method: "put",
        url: url,
        data: {
          useremail: useremailtotoggle,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      this.getUsers();
    },
    async addAdmin() {
      this.$router.push("/signupadmin");
    },
    async toggle_role(useremailtotoggle) {
      let token = this.$auth.strategy.token.get();
      const url = "http://192.168.15.205:8080/api/test/adminChangeRole";
      let res = await axios({
        method: "put",
        url: url,
        data: {
          useremail: useremailtotoggle,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      this.getUsers();
    },
    viewClusters() {
      this.$router.push('/clusters');
    },
    pbsAdminControl() {
      location.href='https://192.168.15.202:9500/pc';
    },
    async delete_user(useremailtotoggle) {
      let flag = prompt(`Are You Sure You Want To Delete This User ? ${useremailtotoggle} \n Enter Yes to Continue. `);
      flag = flag.toLowerCase();
      if (flag == 'yes') {
        let token = this.$auth.strategy.token.get();
        const url = "http://192.168.15.205:8080/api/test/deleteUser";
        let res = await axios({
          method: "put",
          url: url,
          data: {
            useremail: useremailtotoggle,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        this.getUsers();
      }
      else{
      return 0;
    }
    }

  },
  components: { TheNavbar },
};
</script>

<style></style>
