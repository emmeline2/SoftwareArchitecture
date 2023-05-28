<template>
  <p> This is the Rate My Gist page</p>

  <pre>{{ code }}</pre>


    <div v-if="gistData.length > 0" class="table-responsive">
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
          <tr v-for = "(gist, rowNum) in gistData">
            <td>{{ gist.id }}</td>
            <td>{{ gist.url }}</td>
            <td>{{ gist.html_url }}</td>
            <td>{{ gist.files }}</td>
          </tr>
        </table>
      </container>
    </div>
    <p>The number of results is {{ gistData.length }}</p>

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
    let gistData = ref<GistApiInterface[]>([]);
    const code = ref<string>('');
  
    onMounted(async () => {
      console.log("Page 1 mounted");
  
      //this is where to go and get the repo data
      let gistURI = 'http://localhost:9500/gists';
  
      //Use axios to load the repo data - readup on await to make
      //async calls easier
      let gistAPI = await axios.get<GistApiInterface[]>(gistURI);
  
      //if OK, set the repoData variable, so that we can render in the ui
      if(gistAPI.status == 200){
        gistData.value = gistAPI.data;
        code.value = getCodeSnippet(gistAPI.data, 'testGist.py');
      }
    })

    // Function to extract code snippet from Gist data
    const getCodeSnippet = (gistData: any, fileName: string): string => {
      for (const gist of gistData) {
        const files = gist.files;
        if (files && files[fileName]) {
          return files[fileName].content;
        }
      }
      return 'ajsdkfjkl';
    };


  
  

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped></style>
