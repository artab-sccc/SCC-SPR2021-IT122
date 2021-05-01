
import * as pokemon from './data.js';
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
app.get('/', (req, res) => {
    res.render('home', {pokemons: pokemon.getAll()});
});

// Render About page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('This is the About Page! My name is Arthur Tabadero and I am a student for IT122: Javascript 2. I am taking this class to learn more about JS and to learn the ways of Node.js!');
});

app.get('/details', (req, res) => {
    let result = pokemon.getItem(req.query.name);
    let details = JSON.stringify(result);
    res.render('details', {name: req.query.name, result: result, details: details});
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

