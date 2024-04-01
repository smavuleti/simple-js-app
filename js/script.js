let pokemonRepository = (function () {
    let pokemonList = [];
    //fetching Pokemon details from API limited to 10 records
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=30";
    let modalContainer = document.querySelector(".modal");

    function add(pokemon) {
        //condition to check the keys from API to add each pokemon to pokemon list
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not found");
        }

    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-info", "btn-lg", "btn-block");

        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-toggle", "modal");

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        checkButtonEvent(button, pokemon);
    }


    // funtion loadlist to fetch the list of pokemon list from API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    // funtion loaddetails to fetch the list of pokemon details from pokemon list
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });

    }
    function checkButtonEvent(button, pokemon) {
        button.addEventListener("click", function (event) {
            console.log(event);
            //alert(pokemon.name + " is clicked!");
            showDetails(pokemon);
        });
    }

    //load pokemon details from API 
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
            showModal(item);
        });
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector(".modal-body");
        let modalHeader = document.querySelector(".modal-header");
        let closeButtonElement = document.querySelector(".close");
        let modalTitle = document.querySelector(".modal-title");

        modalBody.innerHTML = "";

        //image in modal container
        //let imageElement = $('<img class="modal-img" style=width:50%">');
        let imageElement = document.createElement("img");
        imageElement.classList.add("modal-img");
        imageElement.setAttribute("width", "200");
        imageElement.setAttribute("height", "200");
        imageElement.src = pokemon.imageUrl;

        let nameElement = document.createElement("p");
        nameElement.innerHTML = "Name: " + pokemon.name;

        let heightElement = document.createElement("p");
        heightElement.innerHTML = "Height: " + pokemon.height;

        let weightElement = document.createElement("p");
        weightElement.innerHTML = "Weight: " + pokemon.weight;

        let typesElement = document.createElement('p');
        let types = [pokemon.types[0].type.name];
        for (let i = 1; i < pokemon.types.length; i++) {
            types.push(', ' + pokemon.types[i].type.name);
        }
        typesElement.innerHTML = "Types: " + types.join("");

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButtonElement);
        modalBody.appendChild(imageElement);
        modalBody.appendChild(nameElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(typesElement);
    }


    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails

    };
})();

//forEach() to display pokemon list  
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


