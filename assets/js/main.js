const maxRecords = 151;
let offset = 0;
const limit = 10;


const url = `https://pokeapi.co/api/v2/pokemon?${offset}=0&${limit}=10`;

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newhtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}"> 
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('');
        pokemonList.innerHTML += newhtml;

        // Adiciona evento de clique para cada item carregado
        document.querySelectorAll('.pokemon').forEach((pokemonItem) => {
            pokemonItem.addEventListener('click', () => {
                const pokemonId = pokemonItem.getAttribute('data-id'); // Obtém o ID do Pokémon
                window.location.href = `details.html?id=${pokemonId}`; // Redireciona para a página de detalhes
            });
        });
    });
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})