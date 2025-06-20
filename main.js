async function filtrarPersonajes() {
let url = `https://rickandmortyapi.com/api/character/`;
    const response = await axios.get(url);
    console.log(response);
}
filtrarPersonajes()