var pokemonList = [
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
/* For Example: 
pokemonList.forEach( (item,i,arr) => console.log(i, item, arr));
*/

var maxHeight = 0;
pokemonList.forEach(function (checkMaxHeight){
    if (checkMaxHeight.height > maxHeight) {
        maxHeight = checkMaxHeight.height;
    }
});

pokemonList.forEach(function (details){
    if (details.height == maxHeight) {
        document.write(details.name + " (height: " + details.height + ")- Wow that\'s big!<br> <br>");
    } else {
        document.write(details.name + " (height: " + details.height + ") <br><br>");
    }
});




