async function pokeFetch() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); //response fetch

    if (!response.ok) {
      throw new Error("Could not fetch Pokemon");
    }

    const data = await response.json(); //converted to json
    const pokemonSprite = data.sprites.front_default; //got the img from the data
    const imgElement = document.getElementById("pokemonSprite"); //img element from the html

    imgElement.src = pokemonSprite; 
    imgElement.style.display = "block"; //changing the display from none to block as the pokemon name went from "" to something
  } catch (error) {
    console.log(error);
  }
}
