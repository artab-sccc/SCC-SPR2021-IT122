'use strict';
import { expect } from 'chai';
import * as pokemon from '../data.js';

describe("Pokemon", function() {

    it("getItem returns requested pokemon", function() {
        let result = pokemon.getItem("pikachu");
        expect(result).to.deep.equal({name: "pikachu", type: "electric", species: "rat", region: "kanto"});
    });

    it("getItem fails to return requested pokemon", function() {
        let result = pokemon.getItem("mew");
        expect(result).to.be.undefined;
    });

    it("addItem is successful", function() {
        let result = pokemon.addItem({name: "mew", type: "psychic", species: "unknown", region: "kanto"});
        expect(result).to.deep.equal({result: "mew has been added."});
    })

    it("addItem is unsuccessful", function() {
        let addMew = pokemon.addItem({name: "mew", type: "psychic", species: "unknown", region: "kanto"});
        let result = pokemon.addItem({name: "mew", type: "psychic", species: "unknown", region: "kanto"});
        expect(result).to.deep.equal({result: "mew already exists!"});
    })

    it("deleteItem is successful", function() {
        let result = pokemon.deleteItem({name: "pikachu"});
        expect(result).to.deep.equal({result: "pikachu has been deleted."});
    })

    it("deleteItem is unsuccessful", function() {
        let result = pokemon.deleteItem({name: "ditto"});
        expect(result).to.deep.equal({result: "ditto does not exist!"});
    })


});
