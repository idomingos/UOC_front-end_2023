
// import {getJsonFetch, getPoke, showPoke, addPoke, newPokes, updateList } from './pokedex.js';

// Main
var pokes =[]
//Input search
const search = document.querySelector('#search');
search.addEventListener("input", updateList);


let searchParams = new URLSearchParams(document.location.search);
if (searchParams.size > 0 && searchParams.has("pokeID") && searchParams.get("pokeID") != ""){
	let pokeID = parseInt(searchParams.get("pokeID"));
	if (!isNaN(pokeID)){
		let pokemons = JSON.parse(localStorage.pokes);
		pokeID = parseInt(pokeID);
		console.log(pokeID);
		if(pokemons[pokeID] != null ){
			showPoke(pokemons[pokeID]);
			search.classList.add('hidden');
		}
		else{
			console.log(pokemons[pokeID]);
			newPokes(10);
		}
	}
}
else{
	newPokes(10);
}


// Functions 

async function getJsonFetch(url){
	let response = await fetch(url);
	return await response.json()
}

function getChildrenElements(parentNodeId){
	let  htmlCollection = document.getElementById(parentNodeId).children;
	return [].slice.call(htmlCollection);
}

async function getPoke(id){
	return await getJsonFetch("https://pokeapi.co/api/v2/pokemon/" + id.toString() + "/");
};

function showPoke(poke){
	let elements = getChildrenElements('pokemons');
		if(elements != null){
			elements.forEach(element => element.classList.add('hidden'));
		}
	let element = document.getElementById("poke-" + poke.id);
	if (element == null){
		const temp = document.getElementById('PokedexPokemon');
		const clonedTemplate = temp.content.cloneNode(true);
		let card = clonedTemplate.querySelector('.poke-details')
		let front = clonedTemplate.querySelector('.poke-front');
		let back = clonedTemplate.querySelector('.poke-back');
		let name = clonedTemplate.querySelector('.poke-name'); 
		let descrition = clonedTemplate.querySelector('.poke-descripttion');
		let atac = clonedTemplate.querySelector('.poke-atac'); 
		let defensa = clonedTemplate.querySelector('.poke-defensa');
		let type = clonedTemplate.querySelector('.poke-type');
		card.setAttribute('id', "poke-" + poke.id);
		front.src = poke.sprites.front_default;
		back.src = poke.sprites.back_default;
		name.textContent = poke.name;
		atac.textContent = poke.stats[1].base_stat;
		defensa.textContent = poke.stats[2].base_stat;
		poke.types.forEach(element => {
			let li = document.createElement('LI');
			li.innerHTML = element.type.name;
			card.appendChild(li);
		});
		const out = document.querySelector('#pokemons');
		out.appendChild(clonedTemplate);
	}
	else{
		element.classList.remove('hidden');
	}
}

function addPoke(data){
	if (document.getElementById(data.id) == null){
		const temp = document.getElementById('pokedexListTemplate');
		const clonedTemplate = temp.content.cloneNode(true);
		let card = clonedTemplate.querySelector('.card');
		let image = clonedTemplate.querySelector('.image');
		let name = clonedTemplate.querySelector('.pokeName'); 
		let id = clonedTemplate.querySelector('.id');
		card.setAttribute('id', data.id);
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
		card.setAttribute('data-name', data.name);
		image.src = data.sprites.front_default;
		name.textContent = data.name;
		id.textContent = data.id;
		const out = document.querySelector('#list');
		out.appendChild(clonedTemplate);
		let element = document.getElementById(data.id);
		element.addEventListener("click", function(event){
			event.preventDefault();
			let e = event.target;
			while(e.parentNode.nodeName != 'UL'){
				e = e.parentNode;
			}
			showPoke(pokes[e.id]);
		});
		return 1;
	}
	else{
		return 0;
	}
}

async function newPokes(number){
	let query = "https://pokeapi.co/api/v2/pokemon"
	let p = await getJsonFetch(query);
	query = query + "?offset=0&limit=" + p.count;
	let allPokemons = await getJsonFetch(query);
	let random  = 0;
	let i = 0;
	while (i<number){
		random = Math.floor(Math.random() * allPokemons.results.length);
		if (pokes[random] == null){
			let result = await getJsonFetch(allPokemons.results[random].url);
			if (result != null){
				pokes[result.id]= result;
			 	i = i + addPoke(result);
			}
		}
	}
	localStorage.setItem("pokes", JSON.stringify(pokes));
}

function updateList(e) {
	let word = (search.value).toLowerCase();
	let elements = getChildrenElements("list");
	if (word != ""){
		elements.forEach(element => element.classList.add('hidden'));
		let text = "#list li[data-name^='"+ word +"']";
  		htmlCollection = document.querySelectorAll(text);
  		var matches = [].slice.call(htmlCollection);
  		matches.forEach(element => element.classList.toggle('hidden'));
	}
	else{
		elements.forEach(element => element.classList.remove('hidden'));
	}
}



