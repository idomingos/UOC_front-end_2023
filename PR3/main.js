// General variables
var pokes =[]
var showAll = true;

// Select theme
const radio = document.querySelectorAll("input[name='theme']");
radio.forEach( r => {
	r.addEventListener("change", function(){
		selectTheme(this.value);
	})
});
// Apply saved theme
let themeColor = window.localStorage.getItem("theme");
if(themeColor){ 
	selectTheme(themeColor);
	//Button checked
	let button = document.getElementById("radio_" + themeColor);
	if (button) button.checked = true;
}

//Input search
const search = document.querySelector('#search');
search.addEventListener("input", updateList);


//Main
let searchParams = new URLSearchParams(document.location.search);
if (searchParams.has("pokeID") && searchParams.get("pokeID") != ""){
	let pokeID = parseInt(searchParams.get("pokeID"));
	if (!isNaN(pokeID)){
		let pokemons = JSON.parse(localStorage.pokes);
		pokeID = parseInt(pokeID);
		if(pokemons[pokeID] != null ){
			showAll = false;
			showPoke(pokemons[pokeID]);
			search.classList.add('hidden');
		}
		else{
			//This Pokemon does not exist in the local list.
			newPokes(10);
		}
	}
	else{
		//Incorrectly formatted Pokemon ID, not a number
		newPokes(10);
	}
}
else{
	//There are no parameters
	newPokes(10);
}


// Functions 
function selectTheme(theme){
	let body = document.getElementById("body");
	body.classList.remove("dark");
	body.classList.remove("ligth");
	body.classList.add(theme);
	window.localStorage.setItem("theme", theme);
}

async function getJsonFetch(url){
	let response = await fetch(url);
	return await response.json()
}

function getChildrenElements(parentNodeId){
	let  htmlCollection = document.getElementById(parentNodeId).children;
	return [].slice.call(htmlCollection);
}

function hidePoke(id){
	let element = document.getElementById(id);
	element.classList.toggle("hidden");
}
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

		// Load the default image if it doesn't exist
		front.src = poke.sprites.hasOwnProperty("front_default") && poke.sprites.front_default != null ?
			poke.sprites.front_default : "./img/noImage.png";
		back.src = poke.sprites.hasOwnProperty("back_default") && poke.sprites.back_default != null ?
			poke.sprites.back_default : "./img/noImage.png";
		name.textContent = poke.name;
		atac.textContent = "Atac: " + poke.stats[1].base_stat;
		defensa.textContent = "Defensa: " + poke.stats[2].base_stat;
		poke.types.forEach(element => {
			let li = document.createElement('LI');
			li.innerHTML = element.type.name;
			type.appendChild(li);
		});
		const out = document.querySelector('#pokemons');
		out.appendChild(clonedTemplate);

		element = document.getElementById("poke-" + poke.id);
		console.dir(element)
		if(showAll == true){
			element.addEventListener("click", function(event){
				event.preventDefault();
				let e = event.target;
				while(e.parentNode.nodeName != 'SECTION'){
					e = e.parentNode;
				}
			hidePoke(e.id);
		});
		}
	}
	else{
		element.classList.remove('hidden');
	}
}

function addPoke(data){
	//If pokemon doesn't exist then create it
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
		image.src = data.sprites.hasOwnProperty("front_default") && data.sprites.front_default != null ?
			data.sprites.front_default : "./img/noImage.png";
		name.textContent = (data.name).length > 15 ? (data.name).slice(0,14)+"..." : data.name;
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
	// Get a list of all pokemon
	let query = "https://pokeapi.co/api/v2/pokemon"
	let p = await getJsonFetch(query);
	query = query + "?offset=0&limit=" + p.count;
	let allPokemons = await getJsonFetch(query);
	let random  = 0;
	let i = 0;
	while (i<number){
		random = Math.floor(Math.random() * allPokemons.results.length);
		if (pokes[random] == null){
			// Get pokemon
			let result = await getJsonFetch(allPokemons.results[random].url);
			if (result != null){
				// Add or rewrite pokemon to the local list
				pokes[result.id] = result;
				// Increase if the pokemon was successfully added
			 	i = i + addPoke(result);
			}
		}
	}
	//Save to the local storage
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



