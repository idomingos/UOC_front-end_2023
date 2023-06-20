<script setup>
import { RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { onMounted} from 'vue'

//import {ref} from 'vue'
//const theme = ref('dark')
const changeTheme = (e) => {
  let theme = e.target.value;
  document.body.className = theme;
  window.localStorage.setItem("theme", theme);
}

// Apply theme settings
onMounted(()=>{
  let theme = window.localStorage.theme ? window.localStorage.getItem("theme") : "dark";
  document.body.className = theme;
  (document.getElementById(theme)).checked = true;
})
</script>

<template>
  <!--main class="themed" :class="theme"-->
    <header>
      <section>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="Front End Web Developer CFCC" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/pokedex">Pokedex</RouterLink>
        </nav>
      </div>
    </section>
      <section class="settings">
        <label for="dark">Dark</label>
        <!--input type="radio" name="theme" id="dark" value="dark" v-model="theme" @change="changeTheme" checked-->
        <input type="radio" name="theme" id="dark" value="dark" @change="changeTheme">
        <label for="ligth">Ligth</label>
        <!--input type="radio" name="theme" id="ligth" value="ligth" v-model="theme" @change="changeTheme"-->
        <input type="radio" name="theme" id="ligth" value="ligth" @change="changeTheme">
      </section>
    </header>
    <RouterView />
  <!--/main-->
</template>

//Override estyles
<style>

:root{
  --bg-color: #181818;
  --text-color: hsla(150,100%,37%,1);
}

body.dark{
  --bg-color: #181818;
  --text-color: hsla(150,100%,37%,1);
  --color-text: hsla(15,100%,74%,99);
}

body.ligth{
  --bg-color: white;
  --text-color: hsla(15,100%,74%,99);
  --color-text: hsla(150,100%,37%,1);
}

/*.themed.dark{
  --bg-color: #181818;
  --text-color: hsla(150,100%,37%,1)
}

.themed.ligth{
  --bg-color: white;
  --text-color: hsla(15,100%,74%,99)
}

.themed{
  background-color: var(--bg-color);
  color: var(--text-color);
}*/
a{
    text-decoration: none;
    color: var(--text-color);
    transition: 0.4s;
}

button{
  background-color: var(--text-color);
  color: var(--bg-color);
}
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
label{
    padding-left: 1rem;
    padding-right: 0.2rem;
  }

@media (min-width: 1280px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  label{
    text-align: center;
    padding: 0px;
  }
}
</style>