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

const addItem = (newPokemon) => {
    let newItem = getItem(newPokemon.name);
    let msg = "";
    if (!newItem) {
        pokemons.push(newPokemon);
        msg = newPokemon.name + " has been added.";
    } else {
        msg = newPokemon.name + " already exists!";
    };
    return {result: msg};
};

const deleteItem = (delPokemon) => {
    let toDelete = getItem(delPokemon.name);
    let msg = "";
    if (toDelete) {
        pokemons.splice(pokemons.indexOf(toDelete), 1);
        msg = delPokemon.name + " has been deleted.";
    } else {
        msg = delPokemon.name + " does not exist!";
    };
    return {result: msg};
}

export { getAll, getItem, addItem, deleteItem, pokemons };
