let contenedor = document.querySelector("#contenedor-cards");
let PersonajesNumeros = 1; // Empieza desde el personaje 1

async function traerPersonajes(offset = 1) {
  try {
    const personajes = [];

    for (let i = offset; i < offset + 12; i++) {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${i}`);
      personajes.push(response.data);
    }

    renderizarPersonajes(personajes);
  } catch (error) {
    console.log("Error al traer personajes:", error);
  }
}

function renderizarPersonajes(personajes) {
  contenedor.innerHTML = "";
  personajes.forEach((personaje) => {
    contenedor.innerHTML += `
      <div class="card bg-slate-600 max-w-xs shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 p-2">
        <div class="w-full h-56 overflow-hidden bg-gray-200">
          <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-full object-cover rounded-4xl" />
        </div>
        <div class="p-4 flex flex-col items-start gap-2">
          <h3 class="text-sm text-gray-400 font-semibold tracking-wide">#${String(personaje.id).padStart(4, '0')}</h3>
          <h2 class="text-xl font-bold text-white">${personaje.name}</h2>
          <span class="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">${personaje.status}</span>
        </div>
      </div>
    `;
  });
}

// Botones de paginación
let ant = document.querySelector("#ant");
let sig = document.querySelector("#sig");

sig.addEventListener("click", function () {
  if (PersonajesNumeros + 12 <= 826) { // Hay 826 personajes en total
    PersonajesNumeros += 12;
    traerPersonajes(PersonajesNumeros);
  }
});

ant.addEventListener("click", function () {
  if (PersonajesNumeros > 1) {
    PersonajesNumeros -= 12;
    traerPersonajes(PersonajesNumeros);
  }
});

// Inicial
traerPersonajes();
