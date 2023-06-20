<script setup>
import { pokeExist, getLocal, removePokemon } from '../services/services';
import { ref, onMounted } from 'vue';
const props = defineProps(['pokeId'])

const pokemons = getLocal("pokes");
const exist = ref(-1);
const pokemon = ref({});

onMounted(()=>{
    exist.value = pokeExist(pokemons, props.pokeId);
    pokemon.value  = pokemons[exist.value];
})
</script>

<template>
    <main>
        <article v-if="exist>=0" class = "card">
            <h2>{{ pokemon.name }}</h2>
            <h3>Valor d'atac : {{ pokemon.stats[1].base_stat }}</h3>
            <h3>Valor de defensa: {{ pokemon.stats[2].base_stat }}</h3>
            <img :src="pokemon.sprites.front_default" alt="">
            <ul>Tipus:
                <li v-for="tipus in pokemon.types" :key="tipus.name">{{ tipus.type.name }}</li>
            </ul>
            <button @click="$router.push({ name: 'pokedex' })"> All Pokemons</button>
            <button @click="removePokemon(pokemon.id); $router.push({ name: 'pokedex' })">Remove</button>
        </article>
        <article v-else >
            <p>Aquest pokemon no existeix en la base de dades local.</p>
        </article>

    </main>
</template>

<!--https://vue-loader.vuejs.org/guide/scoped-css.html-->
<style scoped>
.card {
display: flex;
flex-direction: column;
padding: 1rem;
border: 2px solid #333;
border-radius: 6px;
overflow: hidden;
box-shadow: 0 0 5px 5px var(--text-color);
width: fit-content;
width: 250px;
min-height: auto;
}
h2{
    text-align: center;
}
h2::first-letter{
    text-transform: uppercase;
}
ul {
    list-style-type: none;
}
li {
    display: inline-block;
    margin: 0.5rem;
}

</style>