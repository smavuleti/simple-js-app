let pokemonRepository = (function () {
    let pokemanList = [
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
        return pokemanList;
    }
    function add(pokeman) {
        pokemanList.push(pokeman);
    }
    return {
        getAll: getAll,
        add: add
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

// creating a new variable to store the maximum height in pokeman array 
var maxHeight = 0;
//forEach() loop to search and check maximum height in array 
pokemonRepository.getAll().forEach(function (checkMaxHeight) {
    //if condition is to compare the each height in array to maxheight
    if (checkMaxHeight.height > maxHeight) {
        //storing the maximum height in maxHeight
        maxHeight = checkMaxHeight.height;
    }
});
//forEach() to display pokeman list array 
pokemonRepository.getAll().forEach(function (details) {
    //if condition is to display array with maximum height text
    if (details.height == maxHeight) {
        document.write(details.name + " (height: " + details.height + ")- Wow that\'s big!<br> <br>");
    } else {
        document.write(details.name + " (height: " + details.height + ") <br><br>");
    }
});


