<template>
  <p> This is the Repo Search page</p>

  <p>Search using the following Criteria:</p>
  <input type="radio" id="name" name="repos" value="name" v-model = "queryOption">
  <label>Name</label><br>
  <input type="radio" id="repoID" name="repos" value="id" v-model = "queryOption">
  <label>Repo ID</label><br>

  <p>
        <!-- NOTE the keypress and keyup events to mark the field dirty to manage the UI-->
    QueryVal: <input type="text" 
                    v-model="queryValue" 
                    @keypress = "queryChanged"
                    @keyup.delete = "queryChanged"/>
  </p>
  <p>
    <button type="button" 
      @click="fetchRepoInfo()"
      :disabled = "shouldDisable"
      >
      Get Repo Info</button>
  </p>

  <div v-if="repoData.length > 0 && !queryIsDirty">
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      <tr v-for = "(repo, rowNum) in repoData">
        <td>{{ repo.id }}</td>
        <td>{{ repo.name }}</td>
      </tr>
    </table>
  </div>

  <p class="error-text" v-if="apiErrorInfo.isError  && !queryIsDirty"> Unable to locate repo by ID, code = {{ apiErrorInfo.errorCode }}</p>


</template>
  
  <script lang="ts">
  export default {
    name: 'SearchPage',
  };
  </script>
  
  <script setup lang="ts">
  import { ref, computed, watch} from 'vue';
  import type {RepoApiInterface, ApiErrorInterface} from './ApiInterfaces';
  import axios, {AxiosError} from 'axios';
  
  const queryOption = ref("repoID");  //default option is repo id
  const queryValue = ref("");
  const queryIsDirty = ref(false);
  const apiErrorInfo = ref<ApiErrorInterface>({isError: false, errorCode: 0, errorMessage:""})

  let repoData = ref<RepoApiInterface[]>([])

  const queryChanged = (e: Event) => {
    queryIsDirty.value = true;
    repoData.value = [];
  }

  //When the radio button state changes we mark as dirty so we can manage the UI
  //The main purpose of this is to show you watch functionality in that we can 
  //watch for state changes in vue
  const radioButtonChanged = watch(queryOption, () => {
    queryIsDirty.value = true;
    repoData.value = [];
  })

 
  //This is a computed property that will change when the id property
  //changes it is used to enable and disable the button
  const shouldDisable = computed(() => {
      return queryValue.value.length > 0 ? false : true
  })

  let queryByRepoNamePrefix = `http://localhost:9500/search?name=`
  let queryByRepoIdPrefix = `http://localhost:9500/search?id=`

  const fetchRepoInfo = async () =>{
    queryIsDirty.value = false

    const apiPrefix = (queryOption.value == "RepoID") ? queryByRepoIdPrefix : queryByRepoNamePrefix
    const apiURL = apiPrefix + queryValue.value
    console.log(apiURL)
    try{
      let repoAPI = await axios.get<RepoApiInterface[]>(apiURL)
     
      if(repoAPI.status == 200){
        console.log(repoAPI)
        apiErrorInfo.value.isError = false;
        apiErrorInfo.value.errorCode = repoAPI.status;
        apiErrorInfo.value.errorMessage = repoAPI.statusText;
        repoData.value = repoAPI.data
        console.log(repoData.value)
      } else {
          console.log("bad repo value")
      }
    } catch (err) {
      let e = err as AxiosError //convert to axios error type
      if (e.response) {
        apiErrorInfo.value.isError = true;
        apiErrorInfo.value.errorCode = e.response.status;
        apiErrorInfo.value.errorMessage = e.request.statusText;
        console.log("Got Error Code ", e.response.status)
      } else {
        // Anything else
      }

    }

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .error-text{
    color:red;
  }

  .happy-text{
    color:green;
  }

</style>