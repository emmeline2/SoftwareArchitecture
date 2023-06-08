<template>
  <p class="heading"> This is a list for all my repositories: </p>

  <!-- Only render this table if there is repo data-->
  <div v-if="repoData.length > 0" class="table-responsive">
    <container> 
      <table class="table table-bordered table-striped">
        <tr>
          <th class="offset-2">ID</th>
          <th>Last Updated</th>
          <th>Name</th>
          <th>Description</th>
          <th>Language</th>
          <th>URL</th>
        </tr>
        <tr v-for = "(repo, rowNum) in repoData">
          <td>{{ repo.id }}</td>
          <td>{{ repo.updated_at }}</td>
          <td>{{ repo.name }}</td>
          <td>{{ repo.description }}</td>
          <td>{{ repo.language }}</td>
          <td><a href="{{ repo.html_url }}">link</a></td>
        </tr>
      </table>
    </container>
  </div>
  <p>The number of results is {{ repoData.length }}</p>
</template>
  
  <script lang="ts">
  export default {
    name: 'ReposPage',
  };
  </script>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type {RepoApiInterface} from './ApiInterfaces';
  import axios from 'axios';

  //Most code goes here
  let repoData = ref<RepoApiInterface[]>([])

  onMounted(async () => {
    console.log("Page 1 mounted")

    //this is where to go and get the repo data
    let allReposURI = 'http://localhost:9500/repos'

    //Use axios to load the repo data - readup on await to make
    //async calls easier
    let repoAPI = await axios.get<RepoApiInterface[]>(allReposURI)

    //if OK, set the repoData variable, so that we can render in the ui
    if(repoAPI.status == 200){
      repoData.value = repoAPI.data
    }
  })


  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .heading{
    font-size: large;
    font-weight: bold;
    text-align: left;
  }
  </style>