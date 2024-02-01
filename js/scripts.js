let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 7,
            type: ['grass', 'poison']
        },
        {
            name: 'Ivysaur',
            height: 9,
            type: ['grass', 'poison']
        },
        {
            name: 'Venusaur',
            height: 2,
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 6,
            type: ['fire']
        },
        {
            name: 'Charmeleon',
            height: 1,
            type: ['fire']
        }
    ]

    function getAll() {
        return pokemonList;
    }
    /*
    function add(pokemon) {
         //validating typeof parameter 
        if (typeof pokemon == 'object') {
            pokemonList.push(pokemon);
        }
    }
    */
    function add(pokemon) {
        //validating Object.keys() of the parameter are equal to the specific keys
        if (typeof pokemon.name == 'string' && typeof pokemon.height == 'number' && typeof pokemon.type == 'object') {
            pokemonList.push(pokemon);
        }
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //DOM: function to add buttons for each pokemon in the array list
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //Event listener function to the buttons in the pokemon array list
        checkButtonEvent(button, pokemon);

        /*
        //event listener for button click action
        button.addEventListener('click', function (event){
            console.log (event);
            alert("Button is clicked!");
            showDetails(pokemon);
            
        });*/
    }

    // event listener function to check if and which button is clicked in the array list
    function checkButtonEvent(button, pokemon) {
        button.addEventListener('click', function (event) {
            console.log(event);

            alert(pokemon.name+ " Pokemon button is clicked!");
            //alert("Button is clicked!");
            showDetails(pokemon);
        });
    }


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

console.log(pokemonRepository.getAll());
//adding a single item to the pokemonList array
pokemonRepository.add({
    name: 'Pikachu',
    height: 8,
    type: ['grass', 'poison']
});
console.log(pokemonRepository.getAll());

// creating a new variable to store the maximum height in pokemon array 
var maxHeight = 0;
//forEach() loop to search and check maximum height in array 
pokemonRepository.getAll().forEach(function (checkMaxHeight) {
    //if condition is to compare the each height in array to maxheight
    if (checkMaxHeight.height > maxHeight) {
        //storing the maximum height in maxHeight
        maxHeight = checkMaxHeight.height;
    }
});
//forEach() to display pokemon list array 
pokemonRepository.getAll().forEach(function (details) {
    pokemonRepository.addListItem(details);

    /* 
    //if condition is to display array with maximum height text
    if (details.height == maxHeight) {
        document.write(details.name + " (height: " + details.height + ")- Wow that\'s big!<br> <br>");
    } else {
        document.write(details.name + " (height: " + details.height + ") <br><br>");
    }
    */

});

