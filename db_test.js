import { Pokemon } from './models/pokemons.js';

Pokemon.find({}, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
    return
});

Pokemon.find({"name": "pikachu"}).lean()
    .then((pokemons) => {
        console.log(pokemons);
    });

//Pokemon.find({}).lean()
//.then((pokemons) => {
//    console.log(pokemons);
//}).catch(err => next(err));
