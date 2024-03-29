let pokemonRepository = (function () {
    let pokemonList = [];
    //fetching Pokemon details from API limited to 10 records
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
    let modalContainer = document.querySelector('#modal-container');

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

        //showModal('Modal title','Modal Text....');


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

        //        console.log("in to show modal");
        // let modalBody = document.querySelector(".modal-body");
        // let modalTitle = document.querySelector(".modal-title");
        // let modalHeader = document.querySelector(".modal-header");

        // //image in modal container
        // //let imageElement = $('<img class="modal-img" style=width:50%">');
        // let imageElement = document.createElement('img');
        // imageElement.classList.add("modal-img");
        // imageElement.src = pokemon.imageUrl;

        // Clear all existing modal content
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //Close action event
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.classList.add('modal-title');
        titleElement.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('modal-img');
        pokemonImage.src = pokemon.imageUrl;
        pokemonImage.alt = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.classList.add('modal-p');
        contentElement.innerText = (' Height is: ') + pokemon.height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);


        modalContainer.classList.add('is-visible');
    }


    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


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


