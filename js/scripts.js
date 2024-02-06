let pokemonRepository = (function () {
    let pokemonList = [];
    //fetching Pokemon details from API limited to 10 records
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";


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
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
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
                //console.log(pokemon);
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });

    }
    function checkButtonEvent(button, pokemon) {
        button.addEventListener('click', function (event) {
            console.log(event);
            alert(pokemon.name + " is clicked!");
            showDetails(pokemon);
        });
    }

    //load pokemon details from API 
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
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


