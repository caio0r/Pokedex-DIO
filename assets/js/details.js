const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

// Verifica se o ID está presente
if (!pokemonId) {
    document.getElementById('pokemonName').textContent = 'ID do Pokémon não fornecido';
    console.error('ID do Pokémon ausente na URL');
} else {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then((pokemon) => {
            document.getElementById('pokemonName').textContent = pokemon.name;
            document.getElementById('pokemonImage').src = pokemon.sprites.other.dream_world.front_default;

            const typesList = document.getElementById('pokemonTypes');
            pokemon.types.forEach((typeSlot) => {
                const typeItem = document.createElement('li');
                typeItem.textContent = typeSlot.type.name;
                typesList.appendChild(typeItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar Pokémon:', error);
            document.getElementById('pokemonName').textContent = 'Erro ao carregar Pokémon';
        });
}
