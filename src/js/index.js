let usuariosUrl = "https://www.mockachino.com/a71b232c-218e-4d/users";
const body = document.body;
const tarjeta = document.querySelector("#tarj");
export let result = [];
const searchBar = document.getElementById("input");
let dropdown = document.getElementById("dropdown");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let titulo = document.getElementById("title")
const maxItems = 10;
let index = 1;

////////////////////////////////////////////////////////////
//trae datos de usuario
export async function getUsuarios() {
  //trae datos de usuarios
  const resp = await fetch(usuariosUrl);
  result = await resp.json();
  tarjUsuarios(result);
  showItem();
}
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
//searchbar - funciona en consola, no trae tarjetas
searchBar.addEventListener("keyup", (e) => {
  const busquedaString = e.target.value.toLowerCase();
  let busquedaFiltrada = result.results.filter((userSearched) => {
    return (
      userSearched.name.first.toLowerCase().includes(busquedaString) ||
      userSearched.name.last.toLowerCase().includes(busquedaString)
    );
  });


//este me lo imprime en consola sin problemas
  console.log(busquedaFiltrada);
  
  //este me trae el error
  tarjUsuarios(busquedaFiltrada);
  
});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
//arreglo ASC y DESC por nombre
dropdown.addEventListener("change", (e) => {
  if (e.target.value == 1) {
    console.log(result.results.sort(byNameAZ));
    console.log(tarjUsuarios(result));
    showItem();
  } else if (e.target.value == 2) {
    console.log(result.results.sort(byNameZA));
    console.log(tarjUsuarios(result));
    showItem();
  } else {
    return false;
  }
});
function byNameAZ(a, b) {
  if (a.name.first > b.name.first) {
    return 1;
  } else if (a.name.first < b.name.first) {
    return -1;
  } else {
    return 0;
  }
}
function byNameZA(a, b) {
  if (a.name.first < b.name.first) {
    return 1;
  } else if (a.name.first > b.name.first) {
    return -1;
  } else {
    return 0;
  }
}
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//crea HTML
const tarjUsuarios = (users) => {
  //trae html

  const htmlString = users.results
    .map((user) => {
      return `
<div id="user">
<div> 
<img class="img1" src="${user.picture.large}">
</div>
<p class="texto" id="nombre">${user.name.first} ${user.name.last}</p>
<p class="texto" id="lugar"><i class="fas fa-map-marker-alt" id="iconoLugar"></i>${user.location.city}, ${user.nat} ${user.location.postcode}</p>
<hr>
<p class="texto" id="tiempo"><i class="far fa-clock" id="iconoTiempo"></i>${user.registered.age} years</p>
<span> <i class="far fa-heart" id="iconoCorazon"></i> </span>
</div>`;
    })
    .join("");
  tarjeta.innerHTML = htmlString;
};
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//muestra 10 usuarios
prev.addEventListener("click", () => {
  index--;
  showItem();
  titulo.innerHTML= `Showing ${index * maxItems - maxItems + 1} - ${index * maxItems} <span id="tituloParteDos"> of 100 candidates</span>`
});

next.addEventListener("click", () => {
  index++;
  showItem();
  titulo.innerHTML= `Showing ${index * maxItems - maxItems + 1} - ${index * maxItems} <span id="tituloParteDos"> of 100 candidates</span>`
});


function showItem() {
  const tarjItems = document.querySelector("#tarj").children;
  console.log(tarjItems);

  for (let i = 0; i < tarjItems.length; i++) {
    tarjItems[i].classList.remove("show");
    tarjItems[i].classList.add("hide");
    if (i >= index * maxItems - maxItems && i < index * maxItems) {
      tarjItems[i].classList.remove("hide");
      tarjItems[i].classList.add("show");
    }
  }
}

////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////


export const init = async () => {
  getUsuarios;
  result;
}
