<script setup>
import {removeLocal} from "../services/services"
</script>

<template>
  <main>
    <section>
      <button @click="removeLocal('pokes')">Remove all pokemons</button>
      <button @click="removeLocal('theme')">Remove theme settins</button>
    </section>
  </main>
</template>

<style scoped>
button{
  margin-right: 3rem;;
  padding: 1rem;
}
</style>