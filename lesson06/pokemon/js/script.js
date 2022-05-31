const app = {
  init: () => {
    // document.getElementById("search").addEventListener("click", app.fetchPokemon);
    app.fetchKantoPokemon();
    // app.fetchPokemon();
  },
  fetchKantoPokemon: () => {
    // let limit = 151;
    let limit = 5;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(allpokemon => {
        // console.log("fetchKantoPokemon");
        // console.log(allpokemon);
        allpokemon.results.forEach(pokemon => {
          // app.fetchPokemonData(pokemon);
          app.fetchPokemonData(pokemon);
        })
      })
      .catch((err) => {
        console.log("Pokemon not found", err)
      });
  },
  fetchPokemonData: pokemon => {
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    fetch(url)
      .then(response => response.json())
      .then(pokeData => {
        // console.log("fetchPokemonData");
        // console.log(pokeData);
        app.renderPokemon(pokeData);
      })
  },
  renderPokemon: pokeData => {

    console.log("renderPokemon");
    console.log(pokeData);
    console.log(pokeData.moves[0].move.name);
    // document.getElementById("name").textContent = pokeData.name;
    // document.getElementsByClassName("name").textContent = pokeData.name;

    // select
    const pokemonContainer = document.getElementById("pokemonContainer");

    let divCard = document.createElement("div");
    pokemonContainer.append(divCard);
    divCard.className = "card";
    divCard.id = `card${pokeData.id}`;

    // the popup
    let divCardPoop = document.createElement("div");
    divCard.append(divCardPoop);
    divCardPoop.className = "poopUp";
    divCardPoop.id = `poop${pokeData.id}`;

    let buttonPoopWrapper = document.createElement("div");
    divCardPoop.append(buttonPoopWrapper);
    buttonPoopWrapper.className = "buttonPoopWrapper";

    let buttonPoop = document.createElement("button");
    buttonPoopWrapper.append(buttonPoop);
    buttonPoop.className = "buttonPoop";
    buttonPoop.id = `poobuttonp${pokeData.id}`;
    buttonPoop.textContent = "❌";
    buttonPoop.setAttribute("onclick", `poop${pokeData.id}()`);

    let pPoopTitle = document.createElement("span");
    buttonPoopWrapper.append(pPoopTitle);
    pPoopTitle.className = "pPoopTitle";
    pPoopTitle.id = `pPoopTitle${pokeData.id}`;
    pPoopTitle.textContent = "Poop Title";

    let pPoopContent = document.createElement("p");
    divCardPoop.append(pPoopContent);
    pPoopContent.className = "pPoopContent"
    pPoopContent.id = `pPoopContent${pokeData.id}`;
    pPoopContent.textContent = "Poop Content";

    let poopScript = document.getElementById("poopScript");
    poopScript.innerHTML += `\nfunction poop${pokeData.id}() {
      document.getElementById("poop${pokeData.id}").classList.toggle("show");
    }`;
    // poopScript.innerHTML += `\nfunction poop${pokeData.id}() {
    //   document.getElementById("poop${pokeData.id}").style.display = "none";
    // }`;

    // the main
    let divCardMain = document.createElement("div");
    divCard.append(divCardMain);
    divCardMain.className = "main";
    divCardMain.id = `main${pokeData.id}`;

    let cardMainImg = document.createElement("img");
    divCardMain.append(cardMainImg);
    cardMainImg.className = "main";
    cardMainImg.id = `main${pokeData.id}`;
    cardMainImg.src = `${pokeData.sprites.other["official-artwork"].front_default}`;
    cardMainImg.alt = `${pokeData.name}`;

    // name
    let cardMainName = document.createElement("p");
    divCardMain.append(cardMainName);
    cardMainName.className = "cardMainName";
    cardMainName.id = `cardMainName${pokeData.id}`;
    let cardMainNameSpan = document.createElement("span");
    cardMainName.append(cardMainNameSpan);
    cardMainNameSpan.className = "labelName"
    cardMainNameSpan.id = `cardMainNameSpan${pokeData.id}`;
    cardMainNameSpan.textContent = "Name: "
    let cardMainNameInfo = document.createElement("span");
    cardMainName.append(cardMainNameInfo);
    cardMainNameInfo.className = "pokeName";
    cardMainNameInfo.id = `cardMainNameInfo${pokeData.id}`;
    cardMainNameInfo.textContent = `${app.capitalizeFirstLetter(pokeData.name)}`;

    // id
    let cardMainID = document.createElement("p");
    divCardMain.append(cardMainID);
    cardMainID.className = "cardMainID";
    cardMainID.id = `cardMainID${pokeData.id}`;
    let cardMainIDSpan = document.createElement("span");
    cardMainID.append(cardMainIDSpan);
    cardMainIDSpan.className = "labelName";
    cardMainIDSpan.id = `cardMainIDSpan${pokeData.id}`;
    cardMainIDSpan.textContent = "ID: ";
    let cardMainIDInfo = document.createElement("span");
    cardMainID.append(cardMainIDInfo);
    cardMainIDInfo.className = "pokeName";
    cardMainIDInfo.id = `cardMainIDInfo${pokeData.id}`;
    cardMainIDInfo.textContent = `${pokeData.id}`;

    // Abilities
    let cardMainAbilities = document.createElement("p");
    divCardMain.append(cardMainAbilities);
    cardMainAbilities.className = "cardMainAbilities";
    cardMainAbilities.id = `cardMainAbilities${pokeData.id}`;
    let cardMainAbilitiesSpan = document.createElement("span");
    cardMainAbilities.append(cardMainAbilitiesSpan);
    cardMainAbilitiesSpan.className = "labelName";
    cardMainAbilitiesSpan.id = `cardMainAbilitiesSpan${pokeData.id}`;
    cardMainAbilitiesSpan.textContent = "Abilities: ";
    let cardMainAbilitiesInfo = document.createElement("span");
    cardMainAbilities.append(cardMainAbilitiesInfo);
    cardMainAbilitiesInfo.className = "pokeName";
    cardMainAbilitiesInfo.id = `cardMainAbilitiesInfo${pokeData.id}`;
    cardMainAbilitiesInfo.textContent = `${app.getAbilities(pokeData.abilities)}`;

    // Moves
    let cardMainMoves = document.createElement("p");
    divCardMain.append(cardMainMoves);
    cardMainMoves.className = "cardMainMoves";
    cardMainMoves.id = `cardMainMoves${pokeData.id}`;
    let cardMainMovesSpan = document.createElement("span");
    cardMainMoves.append(cardMainMovesSpan);
    cardMainMovesSpan.className = "labelName";
    cardMainMovesSpan.id = `cardMainMovesSpan${pokeData.id}`;
    cardMainMovesSpan.textContent = "Moves: ";
    let cardMainMovesInfo = document.createElement("span");
    cardMainMoves.append(cardMainMovesInfo);
    cardMainMovesInfo.className = "pokeName";
    cardMainMovesInfo.id = `cardMainMovesInfo${pokeData.id}`;
    app.getMoves(pokeData.moves, pokeData.id);


  },
  poopUp: () => {

  },
  getAbilities: (data) => {
    // console.log("getAbilities");
    // console.log(data);
    let abilities = [];
    data.forEach((ability) => {
      // console.log("ability");
      // console.log(ability.ability.name);
      // console.log(ability.ability.url); //object of ability
      abilities.push(app.capitalizeFirstLetter(ability.ability.name));
    });
    // console.log(abilities);
    return abilities.join(", ")
    // return abilities
  },
  getMoves: (data, id) => {
    console.log("data")
    console.log(data)
    console.log("getMoves");
    console.log(data[0].move.name);
    console.log(Object.entries(data));
    newData = Object.entries(data);
    move = [];
    newData.map(n => move.push(app.capitalizeFirstLetter(n[1].move.name)));
    // moveUrl = newData.map(n => console.log(n[1].move.url));
    // console.log("result: "+result)
    result = move.join(", ")
    // console.log(typeof result)
    let length = 35;
    let cardMainMovesInfo = document.getElementById(`cardMainMovesInfo${id}`);
    
    
    if (result.length >= length) {
      document.getElementById(`pPoopContent${id}`).innerHTML = `${result}`;
      document.getElementById(`pPoopTitle${id}`).innerHTML = `Moves`;

      cardMainMovesInfo.textContent = result.substring(0, length) + `...`;
      
      let readmoreButton = document.createElement("button");
      cardMainMovesInfo.append(readmoreButton);
      readmoreButton.className = "readmoreButton";
      readmoreButton.id = `readmoreButton${id}`;
      readmoreButton.textContent = "Read More";
      readmoreButton.setAttribute("onclick", `poop${id}()`);
      
    } else {
      cardMainMovesInfo.textContent = result;
    }
  },
  createTypes: (types, ul) => {
    types.forEach(function (type) {
      let typeLi = document.createElement('li');
      typeLi.innerHTML = type['type']['name'];
      ul.append(typeLi)
    })
  },
  createPokeImage: (pokeID, containerDiv) => {
    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    containerDiv.append(pokeImage);
  },
  fetchPokemon: (e) => {
    const name = document.querySelector("#pokemonName").value;
    // const pokemonName = app.lowerCaseName(name);
    const pokemonName = "bulbasaur";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        let resp = response.json();
        // console.log("Response: ");
        // console.log(resp);
        return resp;
      })
      .then((data) => {
        // console.log("data: ");
        // console.log(data);

        // document.querySelector(".pokeImage").textContent = `<img
        // src="${data.sprites.other["official-artwork"].front_default}"
        // alt="${data.name}">`;
        document.querySelector(".pokeImage").textContent = `${data.sprites.other["official-artwork"].front_default}`;
        document.querySelector(".name").textContent = data.name;
        document.querySelector(".weight").textContent = `Weight: ${data.weight}`;


        // document.getElementById("abilities").innerHTML += `<li>${}</li>`;


        document.getElementById("allMost").innerHTML = ""
        for (const dataItem in data.abilities[0].availabilities) {
          dataItem
          // console.log(dataItem);

          document.getElementById("allMost").innerHTML += `<li>${JSON.stringify(dataItem)}</li>`

        }

        // console.log(aMedication[propertyName]);

        // document.querySelector(".abilities").textContent =;
      })
      .catch((err) => {
        console.log("Pokemon not found", err)
      });
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  lowerCaseName: (string) => {
    return string.toLowerCase();
  }

}
app.init();