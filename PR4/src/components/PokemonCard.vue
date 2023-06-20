<script setup>
import {ref} from "vue"
const props = defineProps(['pokemon'])
let selected = ref(false);
</script>

<template>
    <!--article class = "card" @click="selected = selected ? false : true;"-->
    <article class="card">
        <h2>{{ props.pokemon.name }}</h2>
        <h3>Valor d'atac : {{ props.pokemon.stats[1].base_stat }}</h3>
        <h3>Valor de defensa: {{ props.pokemon.stats[2].base_stat }}</h3>
        <img :src="props.pokemon.sprites.front_default" alt="">
        <ul v-if="selected">Tipus:
            <li v-for="tipus in props.pokemon.types" :key="tipus.name">{{ tipus.type.name }}</li>
        </ul>
        <button @click="$router.push({ name: 'pokemon', params: {pokeId: props.pokemon.id } })">Details</button>
    </article>
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
    margin-top: auto;
}
li {
    display: inline-block;
    margin: 0.5rem;
}
button {
    margin-top: auto;
}


</style>