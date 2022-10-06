<template>
  <div>
    <theNavbar />
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="10000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="background.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="logo.jpg"
      >
      <!-- https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/SRTA-City.jpg/1024px-SRTA-City.jpg -->
      </b-carousel-slide>
    </b-carousel>
    <br>
    <br>
    <br>
    <div class="d-flex justify-content-center">
      <img class="rounded-large" src="IMG-events0.jpg">
    </div>
      <div class="d-flex justify-content-center">
      <br>
      <br>
      <br>
      <br>
      <span class="border-bottom border-dark"></span>
      <h2 class="display-5 lead"><u>For Registration : </u></h2>
      <a target="_blank" href="https://docs.google.com/forms/d/1eO67Bj22-ycSZ3Hd-sccUkh3QBGIZt-PSj_TOe0ezpk/viewform?ts=6331790d&edit_requested=true"> Click Here</a>
    <span class="border-bottom border-dark"></span>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>  
    </div>
<span class="border-bottom border-dark"></span>
<div class="container text-white bg-dark">
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a class="nav-link px-2 text-muted"><router-link :to="{ name: 'index' }">Home</router-link></a></li>
      <li class="nav-item"><a class="nav-link px-2 text-muted"><router-link :to="{ name: 'about' }">About</router-link></a></li>
      <li class="nav-item"><a class="nav-link px-2 text-muted"><router-link :to="{ name: 'contact' }">Contact Us</router-link></a></li>
    </ul>
    <p class="text-center text-muted">© 2022 ENHPCG</p>
  </footer>
</div>



  </div>
</template>

<script>
import theNavbar from "../components/theNavbar.vue";
export default {
  name: "IndexPage",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
