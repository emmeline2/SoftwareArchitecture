<template>
  <p class="heading"> Welcome to my page! </p>
  <div class="smallerCarousel">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="./bridge.jpg" alt="Bridge">
          <div class="carousel-caption">
            <h3>Vancouver</h3>
            <p>Canada</p>
          </div>      
        </div>

        <div class="item">
          <img src="./safari.jpg" alt="Safari" >
          <div class="carousel-caption">
            <h3>Nyerere</h3>
            <p>Tanzania</p>
          </div>      
        </div>

        <div class="item">
          <img src="./keta.jpg" alt="Safari">
          <div class="carousel-caption">
            <h3>Keta</h3>
          </div>      
        </div>
      
      </div>

      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
  </div>
</div>

</template>


<script lang="ts">
  export default {
    name: 'HomePage',
  };
  
</script>


  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallerCarousel{
  width: 50% !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  text-align: center;
  overflow-y: hidden;
  max-height: 100vh !important;
}
.carousel-inner img {
  margin: auto;
}
.carousel,.item,.active{
   height:100%;
 }
.carousel-inner{
    height:100%;
}
.heading{
  font-size: large;
  font-weight: bold;
  text-align: center;
}
  
</style>