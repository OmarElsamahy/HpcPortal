<template>
    <div>
    <TheNavbar/>
    <div class="container">
        <div class="col-xl d-flex justify-content-center">
        <h2>Srtacity Cluster</h2>
        <pre><code>{{pbsnode1}}</code></pre>
        </div>
        
        <div class="col-xl d-flex justify-content-center">
        <h2>Nano Cluster</h2>
        <pre><code>{{pbsnode2}}</code></pre>
        </div>
        
        <div class="col-xl d-flex justify-content-center">
        <h2>Ain-Shams Cluster</h2>
        <pre><code>{{pbsnode3}}</code></pre>
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
      title: 'ENHPCG/Software Modules',
    }
  },
    mounted: async function () {
      await this.getData();
    },
    data: function () {
    return {
      pbsnode1: "",
      pbsnode2: "",
      pbsnode3: "",
    };
  },
    methods: {
      async getData() {
      try {
        let token = this.$auth.strategy.token.get();
        const url = "http://192.168.15.205:8080/api/test/moduleavail?number=1";
        let res = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        this.pbsnode1 = res.data.stderr;

        const url2 = "http://192.168.15.205:8080/api/test/moduleavail?number=2";
        let res2 = await axios.get(url2, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        this.pbsnode2 = res2.data.stderr;

        const url3 = "http://192.168.15.205:8080/api/test/moduleavail?number=3";
        let res3 = await axios.get(url3, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
        });
        this.pbsnode3 = res3.data.stderr;
      }
      catch(err){}
    },
    }
    

}
</script>

<style scoped>

</style>