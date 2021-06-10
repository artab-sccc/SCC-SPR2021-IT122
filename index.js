
import * as pokemon from './data.js';
import { Pokemon } from './models/pokemons.js';
import express from 'express';
import handlebars from 'express-handlebars';
import cors from 'cors';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());
app.use('/api', cors());

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

// Render default home page
app.get('/', (req, res, next) => {
    Pokemon.find({}).lean()
        .then((pokemons) => {
//            res.render('home', {pokemons})
            res.render('home', {pokemons: JSON.stringify(pokemons)});
    }).catch(err => next(err));
});

// Render About page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('This is the About Page! My name is Arthur Tabadero and I am a student for IT122: Javascript 2. I am taking this class to learn more about JS and to learn the ways of Node.js!');
});

// Render details about Pokemon
app.get('/details', (req, res, next) => {
    Pokemon.findOne({"name": req.query.name}).lean()
        .then((pokemons) => {
            res.render('details', {result: pokemons});
         }).catch(err => next(err));
});

// Delete Pokemon from database
app.get('/delete', (req, res) => {
    Pokemon.deleteOne({"name": req.query.name}, (error, result) =>{
        if (result.deletedCount == 0 || error) {
            console.log(error);
            console.log("Delete unsuccessful!");
            res.send("Cannot delete! " + req.query.name + " does not exist!");
        } else {
            res.send(req.query.name + " has been deleted!");
            console.log("Delete successful!?");
        }
        });
    });

// API routes //

// Get all Pokemon from database
app.get('/api/pokemons', (req, res, next) => {
    Pokemon.find({}).lean()
        .then((pokemons) => {
            if (pokemons.length > 0) {
                res.json(pokemons);
            } else {
                res.status(500).send('Database error!');
            }
    }).catch(err => next(err));
});

// Get details about single Pokemon
app.get('/api/pokemons/detail/:name', (req, res, next) => {
    Pokemon.findOne({"name": req.params.name}).lean()
        .then((pokemons) => {
            if(pokemons === null) {
                res.status(500).send('Pokemon not found!');
            } else {
                res.json(pokemons);
            }
         }).catch(err => next(err));
});

// Add Pokemon to database
app.post('/api/pokemons/add', (req, res, next) => {
    Pokemon.findOne({"name": req.body.name}).lean()
        .then((pokemons) => {
            if(pokemons === null) {
                Pokemon.create({
                                    "name":req.body.name, 
                                    "type": req.body.type, 
                                    "species": req.body.species, 
                                    "region": req.body.region
                                }
                );
                res.json({"message": "Pokemon added!"});
            } else {
                res.status(500).send("Pokemon already exists!");
            }});
});

app.post('/api/pokemons/update', (req, res, next) => {
    if (!req.body._id) {
        let newPokemon = new Pokemon(req.body);
        newPokemon.save((err, newPoke) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newPoke._id});
        });
    } else {
        Pokemon.updateOne({ _id: req.body._id}, {name: req.body.name,
        type: req.body.type, species: req.body.species, region: req.body.region},
        (err, result) => {
            if(err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
})

// Delete a Pokemon from database by name
// app.get('/api/pokemons/delete/:name', (req, res, next) => {
//     Pokemon.deleteOne({"name": req.params.name}, (error, result) =>{
//         if (result.deletedCount == 0 || error) {
//             console.log(error);
//             console.log("Delete unsuccessful!");
//             res.status(500).send("Cannot delete! " + req.params.name + " does not exist!");
//         } else {
//             res.json({"message": req.params.name + " has been deleted!"});
//             console.log("Darn, delete successful!");
//         }
//         });
//     });

// Delete a Pokemon from database by ID
app.get('/api/pokemons/delete/:id', (req, res, next) => {
    Pokemon.deleteOne({"_id":req.params.id}, (err, result) => {
        if (err) return next(err);
        res.json({"deleted": result});
    });
});





// Render 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 not found')
});

app.listen(app.get('port'), () => {
    console.log('Express started.');
});

