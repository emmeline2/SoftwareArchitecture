<template>
  <p> This is the Repo page</p>

  <!-- Only render this table if there is student data-->
  <div v-if="repoData.length > 0">
    <table>
      <tr>
        <th>Repo ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Main Language</th>
      </tr>
      <tr v-for = "(repo, rowNum) in repoData">
        <td>{{ repo.repoID }}</td>
        <td>{{ repo.name }}</td>
        <td>{{ repo.description }}</td>
        <td>{{ repo.mainLanguage }}</td>
      </tr>
    </table>
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

    //this is where to go and get the student data
    let allReposURI = 'http://localhost:9500/repos'

    //Use axios to load the student data - readup on await to make
    //async calls easier
    let repoAPI = await axios.get<RepoApiInterface[]>(allReposURI)

    //if OK, set the repoData variable, so that we can render in the ui
    if(repoAPI.status == 200){
      repoData.value = repoAPI.data
    }
  })


  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped></style>