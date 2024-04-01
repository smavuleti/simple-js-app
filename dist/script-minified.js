let pokemonRepository=function(){let e=[],t=document.querySelector(".modal");function n(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):console.log("Pokemon is not found")}function i(){return e}function o(e){pokemonRepository.loadDetails(e).then(function(){console.log(e),function e(t){let n=document.querySelector(".modal-body"),i=document.querySelector(".modal-header"),o=document.querySelector(".close"),l=document.querySelector(".modal-title");n.innerHTML="";let r=document.createElement("img");r.classList.add("modal-img"),r.setAttribute("width","200"),r.setAttribute("height","200"),r.src=t.imageUrl;let a=document.createElement("p");a.innerHTML="Name: "+t.name;let s=document.createElement("p");s.innerHTML="Height: "+t.height;let d=document.createElement("p");d.innerHTML="Weight: "+t.weight;let p=document.createElement("p"),c=[t.types[0].type.name];for(let u=1;u<t.types.length;u++)c.push(", "+t.types[u].type.name);p.innerHTML="Types: "+c.join(""),i.appendChild(l),i.appendChild(o),n.appendChild(r),n.appendChild(a),n.appendChild(s),n.appendChild(d),n.appendChild(p)}(e)})}function l(){t.classList.remove("is-visible")}return{add:n,getAll:i,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item");let l=document.createElement("button");l.innerText=t.name,l.classList.add("btn","btn-info","btn-lg","btn-block"),l.setAttribute("data-target","#exampleModal"),l.setAttribute("data-toggle","modal"),i.appendChild(l),n.appendChild(i),function e(t,n){t.addEventListener("click",function(e){console.log(e),o(n)})}(l,t)},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=30").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function e(t){return fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=e.types}).catch(function(e){console.error(e)})},showDetails:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});