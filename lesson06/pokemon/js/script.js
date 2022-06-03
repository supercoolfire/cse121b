"use strict";

const app = {
  init: () => {
    document.getElementById("search").addEventListener("click", app.fetchThePokemon2);
    document.getElementById("pokemonName").addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        app.fetchThePokemon2();
      }
    });

    let offset = 0;
    let limit = parseInt(document.getElementById("viewBy").value);
    // app.showGallery(offset, limit);

    viewBy.addEventListener("change", () => {
      limit = parseInt(document.getElementById("viewBy").value);
      app.showGallery(0, limit);
    });

    let previous = document.getElementById("previous");
    previous.addEventListener("click", (limit) => {
      if (offset <= 0) {
        offset = 0;
      } else {
        offset -= parseInt(document.getElementById("viewBy").value);
        limit = parseInt(document.getElementById("viewBy").value);
        app.showGallery(offset, limit);
      }
    });
    let next = document.getElementById("next");
    next.addEventListener("click", () => {
      if (limit <= 1126) {
        offset += parseInt(document.getElementById("viewBy").value);
        limit = parseInt(document.getElementById("viewBy").value);
        app.showGallery(offset, limit);
      }
    })

  },
  showGallery: (offset, limit) => {
    document.getElementById("pokemonContainer").textContent = "";

    // alert(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    app.fetchThePokemon(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

  },
  fetchThePokemon: (url) => {
    // let limit = 151;
    // let limit = 20;
    // url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    // fetch(`https://pokeapi.co/api/v2/pokemon`)
    fetch(url)
      .then(response => {
        // response.json();
        let resp = response.json();
        // console.log("fetchThePokemon response")
        // console.log(response)
        return resp

      })
      .then(allpokemon => {
        console.log("fetchThePokemon allpokemon");
        console.log(allpokemon);
        // let count = allpokemon.count;
        // console.log("count: "+count)
        // let next = allpokemon.next;
        // let previous = allpokemon.previous;
        // console.log("next: "+next)
        // console.log("previous: "+previous)
        // if (previous != null) {
        //   document.getElementById("previous").addEventListener("click", app.fetchThePokemon(previous));
        //   } else {
        //     document.getElementById("previous").href = "#";
        //   }
        // document.getElementById("total").textContent = count;
        // if (next != null) {
        // document.getElementById("next").addEventListener("click", app.fetchThePokemon(next));
        // } else {
        //   document.getElementById("next").href = "#";
        // }

        allpokemon.results.forEach(pokemon => {
          // app.fetchPokemonData(pokemon);
          app.fetchPokemonData(pokemon);
        });
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
        app.renderPokemon(pokeData, "pokemonContainer");
      })
  },
  renderPokemon: (pokeData, theContainer) => {

    // console.log("renderPokemon");
    // console.log(pokeData);
    // console.log(pokeData.moves[0].move.name);
    // console.log(pokeData.types[0].type.name);
    // console.log(pokeData.species);
    // document.getElementById("name").textContent = pokeData.name;
    // document.getElementsByClassName("name").textContent = pokeData.name;

    // select
    const pokemonContainer = document.getElementById(theContainer);


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
    buttonPoop.setAttribute("onclick", `poop('poop${pokeData.id}')`);

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

    // the main
    let divCardMain = document.createElement("div");
    divCard.append(divCardMain);
    divCardMain.className = "main";
    divCardMain.id = `main${pokeData.id}`;

    // image
    let cardMainImg = document.createElement("img");
    divCardMain.append(cardMainImg);
    cardMainImg.setAttribute("data-src", `${pokeData.sprites.other["official-artwork"].front_default}`);
    cardMainImg.className = "main";
    cardMainImg.id = `main${pokeData.id}`;
    cardMainImg.src = "images/pokePlacHold.jpg";
    cardMainImg.alt = `${pokeData.name}`;
    // cardMainImg.setAttribute("loading", "lazy");


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

    // Forms
    let cardMainForms = document.createElement("p");
    divCardMain.append(cardMainForms);
    cardMainForms.className = "cardMainForms";
    cardMainForms.id = `cardMainForms${pokeData.id}`;
    let cardMainFormsSpan = document.createElement("span");
    cardMainForms.append(cardMainFormsSpan);
    cardMainFormsSpan.className = "labelName";
    cardMainFormsSpan.id = `cardMainFormsSpan${pokeData.id}`;
    cardMainFormsSpan.textContent = "Forms: ";
    let cardMainFormsInfo = document.createElement("span");
    cardMainForms.append(cardMainFormsInfo);
    cardMainFormsInfo.className = "pokeName";
    cardMainFormsInfo.id = `cardMainFormsInfo${pokeData.id}`;
    app.getForms(pokeData.forms, pokeData.id);

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

    // species
    let cardMainSpecies = document.createElement("p");
    divCardMain.append(cardMainSpecies);
    cardMainSpecies.className = "cardMainSpecies";
    cardMainSpecies.id = `cardMainSpecies${pokeData.id}`;
    let cardMainSpeciesSpan = document.createElement("span");
    cardMainSpecies.append(cardMainSpeciesSpan);
    cardMainSpeciesSpan.className = "labelName";
    cardMainSpeciesSpan.id = `cardMainSpeciesSpan${pokeData.id}`;
    cardMainSpeciesSpan.textContent = "Species: ";
    let cardMainSpeciesInfo = document.createElement("span");
    cardMainSpecies.append(cardMainSpeciesInfo);
    cardMainSpeciesInfo.className = "pokeName";
    cardMainSpeciesInfo.id = `cardMainSpeciesInfo${pokeData.id}`;
    cardMainSpeciesInfo.textContent = `${pokeData.species.name}`;

    // Types
    let cardMainTypes = document.createElement("p");
    divCardMain.append(cardMainTypes);
    cardMainTypes.className = "cardMainTypes";
    cardMainTypes.id = `cardMainTypes${pokeData.id}`;
    let cardMainTypesSpan = document.createElement("span");
    cardMainTypes.append(cardMainTypesSpan);
    cardMainTypesSpan.className = "labelName";
    cardMainTypesSpan.id = `cardMainTypesSpan${pokeData.id}`;
    cardMainTypesSpan.textContent = "Types: ";
    let cardMainTypesInfo = document.createElement("span");
    cardMainTypes.append(cardMainTypesInfo);
    cardMainTypesInfo.className = "pokeName";
    cardMainTypesInfo.id = `cardMainTypesInfo${pokeData.id}`;
    app.getTypes(pokeData.types, pokeData.id);

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
    return abilities.join(", ")
  },
  getForms: (data, id) => {
    // console.log("data")
    // console.log(data)
    // console.log("getForms");
    // console.log(data[0].form.name);
    // console.log(Object.entries(data));
    newData = Object.entries(data);
    form = [];
    newData.map(n => form.push(app.capitalizeFirstLetter(n[1].name)));
    // formUrl = newData.map(n => console.log(n[1].form.url));
    // console.log("result: "+result)
    result = form.join(", ")
    // console.log(typeof result)
    let length = 35;
    let cardMainFormsInfo = document.getElementById(`cardMainFormsInfo${id}`);

    if (result.length >= length) {
      document.getElementById(`pPoopContent${id}`).innerHTML = `${result}`;
      document.getElementById(`pPoopTitle${id}`).innerHTML = `Forms`;

      cardMainFormsInfo.textContent = result.substring(0, length) + `...`;

      let readmoreButton = document.createElement("button");
      cardMainFormsInfo.append(readmoreButton);
      readmoreButton.className = "readmoreButton";
      readmoreButton.id = `readmoreButton${id}`;
      readmoreButton.textContent = "Read More";
      // readmoreButton.setAttribute("onclick", poop(`poop${id}`));
      readmoreButton.setAttribute("onclick", `poop('poop${id}')`);
    } else {
      cardMainFormsInfo.textContent = result;
    }
  },
  getMoves: (data, id) => {
    // console.log("data")
    // console.log(data)
    // console.log("getMoves");
    // console.log(data[0].move.name);
    // console.log(Object.entries(data));
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
      // readmoreButton.setAttribute("onclick", poop(`poop${id}`));
      readmoreButton.setAttribute("onclick", `poop('poop${id}')`);
    } else {
      cardMainMovesInfo.textContent = result;
    }
  },
  getTypes: (data, id) => {
    // console.log("data")
    // console.log(data)
    // console.log("getTypes");
    // console.log(data[0].type.name);
    // console.log(Object.entries(data));
    newData = Object.entries(data);
    type = [];
    newData.map(n => type.push(app.capitalizeFirstLetter(n[1].type.name)));
    // typeUrl = newData.map(n => console.log(n[1].type.url));
    // console.log("result: "+result)
    result = type.join(", ")
    // console.log(typeof result)
    let length = 35;
    let cardMainTypesInfo = document.getElementById(`cardMainTypesInfo${id}`);

    if (result.length >= length) {
      document.getElementById(`pPoopContent${id}`).innerHTML = `${result}`;
      document.getElementById(`pPoopTitle${id}`).innerHTML = `Types`;

      cardMainTypesInfo.textContent = result.substring(0, length) + `...`;

      let readmoreButton = document.createElement("button");
      cardMainTypesInfo.append(readmoreButton);
      readmoreButton.className = "readmoreButton";
      readmoreButton.id = `readmoreButton${id}`;
      readmoreButton.textContent = "Read More";
      // readmoreButton.setAttribute("onclick", poop(`poop${id}`));
      readmoreButton.setAttribute("onclick", `poop('poop${id}')`);
    } else {
      cardMainTypesInfo.textContent = result;
    }
  },
  fetchThePokemon2: (e) => {
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = app.lowerCaseName(name);
    // const pokemonName = "bulbasaur";
    // console.log("pokemonName");
    // console.log(pokemonName);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        let resp = response.json();
        // console.log("Response: ");
        // console.log(resp);
        return resp;
      })
      .then((data) => {
        // console.log("fetchThePokemon2 data");
        // console.log(data);
        document.getElementById("pokemonContainer").textContent = "";
        app.renderPokemon(data, "pokemonContainer");
        // app.renderPokemon(data, "pokemonBox");

      })
      .catch((err) => {
        document.getElementById("pokemonContainer").textContent = "";
        app.fetchThePokemon();
        console.log("Pokemon not found", err)
      });
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  lowerCaseName: (string) => {
    return string.toLowerCase();
  },
}
app.init();