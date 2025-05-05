// fetch = Function used for making HTTP requests to fetch resources
//         (JSON STYLE data, images, files)

//http://pokeapi.co

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok) {
            throw new Error("Could not fetch data");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const pokemonNameDisplay = document.getElementById("pokemonNameDisplay");
        pokemonNameDisplay.textContent = `NAME: ${data.name}`;
        
        const pokemonID = document.getElementById("pokemonID");
        pokemonID.textContent = `ID: ${data.id}`;

        const pokemonType = document.getElementById("pokemonType");
        pokemonType.textContent = `TYPE: ${data.types.map(type => type.type.name).join(", ")}`;

        // Displaying the stats of the Pokemon
        const pokemonHP = document.getElementById("pokemonHP");
        pokemonHP.textContent = `HP: ${data.stats[0].base_stat}`;

        const pokemonAttack = document.getElementById("pokemonAtk");
        pokemonAttack.textContent = `ATTACK: ${data.stats[1].base_stat}`;
        
        const pokemonDefense = document.getElementById("pokemonDef");
        pokemonDefense.textContent = `DEFENSE: ${data.stats[2].base_stat}`;

        const pokemonSpecialAttack = document.getElementById("SpecialAttack");
        pokemonSpecialAttack.textContent = `SPECIAL ATTACK: ${data.stats[3].base_stat}`;

        const pokemonSpecialDefense = document.getElementById("SpecialDef");
        pokemonSpecialDefense.textContent = `SPECIAL DEFENSE: ${data.stats[4].base_stat}`;

        const pokemonSpeed = document.getElementById("pokemonSpeed");
        pokemonSpeed.textContent = `SPEED: ${data.stats[5].base_stat}`;

        const pokemonheight = document.getElementById("pokemonHeight");
        pokemonheight.textContent = `HEIGHT: ${data.height / 10} m`;

        const pokemonweight = document.getElementById("pokemonWeight");
        pokemonweight.textContent = `WEIGHT: ${data.weight / 10} kg`;
    }
    catch (error) {
        console.error(error);
    }
}

loadPokemonList();

async function loadPokemonList(limit = 200) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        const pokemonList = document.getElementById("pokemonList");

        // ננקה את הרשימה הקודמת
        pokemonList.innerHTML = "";

        for (const pokemon of data.results) {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();
            const imgSrc = pokeData.sprites.front_default;

            const li = document.createElement("li");
            li.innerHTML = `<img src="${imgSrc}" alt="${pokeData.name}" title="${pokeData.name}" />`;
            pokemonList.appendChild(li);
        }
    } catch (error) {
        console.error("Failed to load Pokémon list:", error);
    }
}