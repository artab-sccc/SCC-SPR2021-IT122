console.log('Hello!');
const http = require('http');
http.createServer((req,res) => {

    var path = req.url.toLowerCase();
    switch(path) {
        case '/': 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('This is the Home Page!');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('This is the About Page! My name is Arthur Tabadero and I am a student for IT122: Javascript 2. I am taking this class to learn more about JS and to learn the ways of Node.js!');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page not found!');
            break;
    }

}).listen(process.env.PORT || 3000);