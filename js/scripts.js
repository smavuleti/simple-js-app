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
// creating a new variable to store the maximum height in pokeman array 
var maxHeight = 0;
//for loop to search and find out maximum height in array 
for (let i = 0; i < pokemonList.length; i++) {
    //if condition is to compare the each height in array to maxheight
    if (pokemonList[i].height > maxHeight) {
        //storing the maximum height in maxHeight 
        maxHeight = pokemonList[i].height;
    }
}
//for loop to display pokeman list array 
for (let i = 0; i < pokemonList.length; i++) {
    console.log(maxHeight);
    //if condition is to display array with maximum height text
    if (pokemonList[i].height == maxHeight) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")- Wow that\'s big!<br> <br>");
    } else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br><br>");
    }
}










