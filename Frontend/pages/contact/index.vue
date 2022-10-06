<template>
    <div>
        <TheNavbar/>
<!-- Wrapper container -->
<div class="container py-4">

  <!-- Bootstrap 5 starter form -->
  <form id="contactForm" @submit.prevent="sendemail">

    <!-- Email address input -->
    <div class="mb-3">
      <label class="form-label" for="emailAddress">Email Address</label>
      <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" v-model="email" data-sb-validations="required, email" />
      <div class="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
      <div class="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
    </div>

    <!-- Message input -->
    <div class="mb-3">
      <label class="form-label" for="message">Message</label>
      <textarea class="form-control" id="message" type="text" placeholder="Message" v-model="message" style="height: 10rem;" data-sb-validations="required"></textarea>
      <div class="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
    </div>
    <!-- Form submit button -->
    <div class="d-grid">
      <button class="btn btn-primary btn-lg" type="submit">Submit</button>
    </div>

  </form>

</div>
    </div>
</template>

<script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
import TheNavbar from '../../components/theNavbar.vue';

export default {
    head() {
    return {
      title: 'ENHPCG/ContactUs',
      script: [
        { hid: 'stripe', src: 'https://cdn.startbootstrap.com/sb-forms-0.4.1.js', defer: true }
      ]
    }
  },
  data() {
    return {
        email: '',
        message: ''
    };
  },
    components: { TheNavbar },
    methods: {
    validate(){
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

      if (this.emailerr == false) {
        return true;
      } else {
        return false;
      }
    },
    async sendemail() {
        try {
            if (this.validate()) {
              let url = `http://192.168.15.205:8080/api/test/contactus?email=${this.email}&message=${this.message}`;
              await axios.get(url);
              this.$router.push('/');
            }
            else{
                return 0;
            }
        }
        catch (err) {
            return 0;
        }
    }
    }
}
</script>

<style lang="scss" scoped>

</style>