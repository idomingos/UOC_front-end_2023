import pokeAPI from './API.js'

export function getLocal ( key ) {
    return JSON.parse(window.localStorage.getItem(`${key}`))
}
export function saveLocal ( key, data ) {
    window.localStorage.setItem(`${key}`, JSON.stringify(data));
    return true;
}
export function removeLocal (key){
    window.localStorage.removeItem(key);
}
export function pokeExist(db, id){
    return db.findIndex(poke => poke.id == id);
}
export function removePokemon (id){
    let db = getLocal("pokes");
    let index = pokeExist(db, id);
    if(index>=0){
        db.splice(index,1);
        saveLocal("pokes",db);
    } 
}
export function addPokemon( pokemon ) {
    let db = getLocal("pokes");
    if(db == null){ db = [];}
    if(pokeExist(db, pokemon.id) != -1){
        return false;
    }
    else{
        const newPoke = new Object();
        newPoke.id = pokemon.id;
        newPoke.name = pokemon.name;
        newPoke.stats = pokemon.stats;
        newPoke.sprites = pokemon.sprites;
        newPoke.types = pokemon.types;
        db.push(newPoke);
        return saveLocal("pokes", db);
    }
}
export async function getNPokemons(n){
    await pokeAPI.getNumberOfPokemons().then(async limit =>{
        await pokeAPI.getAllPokemons(0, limit).then(async allPokemons => {
            let nPoke = 0;
            while (nPoke < n){
                let random = Math.floor(Math.random() * allPokemons.length);
                let url = (allPokemons[random].url).split('/');
                let id = url[6];
                await pokeAPI.getPokemon(id)
                            .then(async response =>{
                                let poke = response.data;
                                if(await addPokemon(poke)) {
                                    nPoke++ ;
                                }
                            });
            }
        })
    });
}
export const loadPokes = (number, init) => new Promise ((resolve,reject) =>{
    if(window.localStorage.pokes==null || !init){
      try {
        getNPokemons(number).then(()=>{
        resolve()});
      } catch (error) {
        reject(error);
      }
       
    }
    else{
      resolve();
    }
});