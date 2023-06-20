import axios from 'axios'
const pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default {
    async getNumberOfPokemons() {
        return await pokeAPI.get('/pokemon').then(response =>{
            if(response.data.count)
                return response.data.count;
            else
                return 10;
        }); 
    },
    async getAllPokemons( offset, limit) {
        return await pokeAPI.get(`/pokemon/?offset=${offset}&limit=${limit}`).then(response => {
            let results = response.data.results;
            if (Array.isArray(results)){
                return results;
            }
            else{
                return [];
            }
            })
    },
    async getPokemon( id ) {
        return await pokeAPI.get(`/pokemon/${id}`);
    }
}