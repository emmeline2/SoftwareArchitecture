<template>
        <p> This is the <span class="page-text">Repo</span> page</p>
        <p>It will show all active repositories</p>
  </template>
    
    <script lang="ts">
    export default {
      name: 'ReposPage',
    };
    </script>
    
    <script setup lang="ts">
    //Most code goes here
    </script>
    
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-text{
    color:green
}

</style>