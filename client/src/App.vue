<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
//import RouterLink  from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AboutPage from './pages/AboutPage.vue'
import ReposPage from './pages/ReposPage.vue'
import ProjectPage from './pages/ProjectPage.vue'

</script>

<template>
  
  <header>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">AboutPage</RouterLink>
        <RouterLink to="/project">ProjectPage</RouterLink>
        <RouterLink to="/repos">ReposPage</RouterLink>
      </nav>
      <hr/>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


</style>
