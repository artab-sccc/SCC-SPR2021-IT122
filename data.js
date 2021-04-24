let pokemons = [
    {name: "pikachu", type: "electric", species: "rat", region: "kanto"},
    {name: "squirtle", type: "water", species: "turtle", region: "kanto"},
    {name: "rowlet", type: "grass", species: "owl", region: "alola"},
    {name: "oshawott", type: "water", species: "otter", region: "unova"},
    {name: "litten", type: "fire", species: "cat", region: "alola"}
];

const getAll = () => {
    return pokemons;
};

const getItem = (name) => {
    return pokemons.find((pokemon) => {
        return pokemon.name === name;
    });
}

export { getAll, getItem, pokemons };
