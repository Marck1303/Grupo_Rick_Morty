let contenedor = document.querySelector("#contenedor-cards");
let pokeNumeros = 1; // Empieza desde el personaje 1

async function traerPersonajes(offset = 1) {
  try {
    const personajes = [];

    for (let i = offset; i < offset + 12; i++) {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${i}`);
      personajes.push(response.data);
    }

    renderizarPokes(personajes);
  } catch (error) {
    console.log("Error al traer personajes:", error);
  }
}

function renderizarPokes(personajes) {
  contenedor.innerHTML = "";
  personajes.forEach((personaje) => {
    contenedor.innerHTML += `
      <div class="card flex flex-col items-center justify-center">
        <div id="cont-img" class="bg-gray-100 rounded-xl">
          <img src="${personaje.image}" alt="${personaje.name}" />
        </div>
        <div id="cont-pkm" class="flex flex-col justify-start w-full p-2 gap-1">
          <h3 class="text-gray-500 font-semibold">#${String(personaje.id).padStart(4, '0')}</h3>
          <h2 class="text-2xl">${personaje.name}</h2>
        </div>
      </div>
    `;
  });
}

// Botones de paginación
let ant = document.querySelector("#ant");
let sig = document.querySelector("#sig");

sig.addEventListener("click", function () {
  if (pokeNumeros + 12 <= 826) { // Hay 826 personajes en total
    pokeNumeros += 12;
    traerPersonajes(pokeNumeros);
  }
});

ant.addEventListener("click", function () {
  if (pokeNumeros > 1) {
    pokeNumeros -= 12;
    traerPersonajes(pokeNumeros);
  }
});

// Inicial
traerPersonajes();
