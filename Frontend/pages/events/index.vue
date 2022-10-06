<template>
    <div>
        <TheNavbar/>
    <div class="d-flex justify-content-center">
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
        img-src="IMG-events0.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="IMG-events1.jpg"
      ></b-carousel-slide>
            <b-carousel-slide
        img-src="IMG-events2.jpg"
      ></b-carousel-slide>
    </b-carousel>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
      <div class="d-flex justify-content-center">
      <span class="border-bottom border-dark"></span>
      <h2 class="display-5 lead"><u>For Registration : </u></h2>
      <a target="_blank" href="https://docs.google.com/forms/d/1eO67Bj22-ycSZ3Hd-sccUkh3QBGIZt-PSj_TOe0ezpk/viewform?ts=6331790d&edit_requested=true"> Click Here</a>
    </div>
    </div>
</template>

<script>
import TheNavbar from '../../components/theNavbar.vue';
export default {
    head() {
    return {
      title: 'ENHPCG/Events',
    }
  },
    components: { TheNavbar }
}
</script>

<style lang="scss" scoped>

</style>