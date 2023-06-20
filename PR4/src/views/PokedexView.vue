<script async setup>
  import {computed} from 'vue'
  import {getLocal, loadPokes} from '../services/services.js'
  import PokemonCard from '../components/PokemonCard.vue'
  import {ref} from 'vue';
 
  const dataLoaded =ref(false);
  const pokemons = ref({});
  const search = ref("")
  
  const filteredPokemons = computed(()=>{
        return pokemons.value.filter((pokemon)=>{
          return pokemon.name.toLowerCase().startsWith(search.value.toLowerCase());
        });
  });

  function addPokes(number){
    loadPokes(number, false).finally(()=>{
      pokemons.value = getLocal("pokes");
    });
  };

  loadPokes(10, true).finally(()=>{
    pokemons.value= getLocal("pokes");
    dataLoaded.value = true});
</script>

<template>
    <main>
        <section v-if="dataLoaded">
            <input v-show="pokemons.length > 0 " name="search" v-model="search" type="text" placeholder="Type to search...">
            <br/>
            <button @click="addPokes(5)">Add Pokemons</button>
        </section>
        <section v-if="dataLoaded" class="cards">
            <PokemonCard v-for="poke in filteredPokemons" :key="poke.id" :pokemon="poke"/>
        </section>
        <section v-else>
            <p>Loading ...</p>
        </section>
    </main>
</template>

<style scoped>

.cards {
    display: flex;
    flex: auto;
    flex-direction: row;
    flex-wrap: wrap;
    width: fit-content;
    gap: 1rem;
}
section{
    padding: 0.5rem;
}
</style>
