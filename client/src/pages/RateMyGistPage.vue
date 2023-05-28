<template>
  <p> This is the Rate My Gist page</p>
  <pre id="gist-code">{{ gistData }}</pre>

  </template>
    
    <script lang="ts">
    export default {
      name: 'RateMyGistPage',
    };
    </script>
    
    <script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type {GistApiInterface} from './ApiInterfaces';
    import axios from 'axios';
  
    //Most code goes here
    let gistData = ref<GistApiInterface[]>([])
  
    onMounted(async () => {
      console.log("Page 1 mounted")
  
      //this is where to go and get the repo data
      let gistURI = 'http://localhost:9500/gist'
  
      //Use axios to load the repo data - readup on await to make
      //async calls easier
      let gistAPI = await axios.get<GistApiInterface[]>(gistURI)
      //const url = `https://api.github.com/gists/${gistId}`;
  
      //if OK, set the repoData variable, so that we can render in the ui
      if(gistAPI.status == 200){
        gistData.value = gistAPI.data
      }
    })
  

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped></style>
