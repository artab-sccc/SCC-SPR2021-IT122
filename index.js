
import * as pokemon from './data.js';
import { Pokemon } from './models/pokemons.js';
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

// Render default home page
app.get('/', (req, res, next) => {
    Pokemon.find({}).lean()
        .then((pokemons) => {
            res.render('home', {pokemons})
    }).catch(err => next(err));
});

// Render About page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('This is the About Page! My name is Arthur Tabadero and I am a student for IT122: Javascript 2. I am taking this class to learn more about JS and to learn the ways of Node.js!');
});

app.get('/details', (req, res) => {
    Pokemon.findOne({"name": req.query.name}).lean()
        .then((pokemons) => {
            res.render('details', {result: pokemons});
         }).catch(err => next(err));
});

app.get('/delete', (req, res) => {
    Pokemon.deleteOne({"name": req.query.name}, (error, result) =>{
        if (result.deletedCount == 0 || error) {
            console.log(error);
            console.log("Delete unsuccessful!");
            res.send("Cannot delete! " + req.query.name + " does not exist!");
        } else {
            res.send(req.query.name + " has been deleted!");
            console.log("Delete successful!");
        }
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

