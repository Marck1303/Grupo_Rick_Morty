let contenedor = document.querySelector("#contenedor-cards");


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
          <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-full object-cover" />
        </div>
        <div class="p-4 flex flex-col items-start gap-2">
          <h3 class="text-sm text-gray-400 font-semibold tracking-wide">#${String(personaje.id).padStart(4, '0')}</h3>
          <h2 class="text-xl font-bold text-white">${personaje.name}</h2>
          <div class="flex w-full justify-between">
            <span class=" text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Status: ${personaje.status}</span>
            <span class=" text-sm font-medium px-2 py-1 bg-green-200 text-gray-800 rounded-full">Especie: ${personaje.species}</span>
          </div>
        </div>
      </div>
    `;
  });
}

// Botones de paginación
let ant = document.querySelector("#ant");
let sig = document.querySelector("#sig");
let PersonajesNumeros = 1; // Empieza desde el personaje 1


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



//
const filtroEstado = document.getElementById("filtro-estado");
const filtroEspecie = document.getElementById("filtro-especie");

// Evento para filtrar cuando cambie alguno
filtroEstado.addEventListener("change", filtrarPersonajes);
filtroEspecie.addEventListener("change", filtrarPersonajes);

async function filtrarPersonajes() {
  const estado = filtroEstado.value;
  const especie = filtroEspecie.value;

  try {
    let url = `https://rickandmortyapi.com/api/character/?`;
    if (estado) url += `status=${estado}&`;
    if (especie) url += `species=${especie}&`;

    const response = await axios.get(url);
    renderizarPersonajes(response.data.results);
  } catch (error) {
    console.error("Error al filtrar personajes:", error);
    contenedor.innerHTML = `<p class="text-white col-span-full">No se encontraron personajes</p>`;
  }
}

document.getElementById("boton-drop").addEventListener("click", () => {
  const drop = document.getElementById("dropdown");
  drop.classList.toggle("hidden");
});