<script lang="ts">
import { onMounted, ref } from 'vue';
import type {GistApiInterface} from './ApiInterfaces';
import axios from 'axios';



export default {
  name: 'RateMyGistPage',
  data() {
    return {
      gistData: ref<GistApiInterface[]>([]),
      fetchedCode: '',
    };
  },
  mounted() {
    this.fetchGistData();
  },
  methods: {
    async fetchGistData() {
      try {
        const response = await axios.get<GistApiInterface[]>('http://localhost:9500/gists');
        if (response.status === 200) {
          this.gistData = response.data;
          this.fetchData();
      }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async fetchData() {
      for (const gist of this.gistData) {
        const url = "http://localhost:9500/gists/" + gist.id;
        console.log(url);
        try {
          const response = await axios.get<GistApiInterface[]>(url);
          const code = response.data; // Store the fetched code in a variable

          
          this.fetchedCode += code; // Append the fetched code to the existing fetchedCode
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <p>This is the Rate My Gist page</p>
    <pre id="content">{{ fetchedCode }}</pre>

    <div v-if="gistData.length > 0" class="table-responsive">
      <container>
        <table class="table table-bordered table-striped">
          <tr>
            <th class="offset-2">ID</th>
            <th>url</th>
            <th>html_url</th>
            <th>files</th>
          </tr>
          <tr v-for="(gist, rowNum) in gistData" :key="rowNum">
            <td>{{ gist.id }}</td>
            <td>{{ gist.url }}</td>
            <td>{{ gist.html_url }}</td>
            <td>{{ gist.files }}</td> 
          </tr>
        </table>
      </container>
    </div>
    <p>The number of results is {{ gistData.length }}</p>
  </div>
</template>