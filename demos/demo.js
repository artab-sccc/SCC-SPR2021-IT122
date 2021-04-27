import { read } from 'fs';
import http from 'http';
import {getAll, getItem, pokemons} from './data.js';
import qs from 'querystring';

http.createServer((req,res) => {

    let url = req.url.split("?");
    let path = url[0].toLowerCase();
    let query = qs.parse(url[1]);

    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(pokemons));
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('This is the About Page! My name is Arthur Tabadero and I am a student for IT122: Javascript 2. I am taking this class to learn more about JS and to learn the ways of Node.js!');
            break;
        case '/details':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(getItem(query.name)));
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page not found!');
            break;
    }

}).listen(process.env.PORT || 3000);