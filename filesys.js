// Modulos en node.js
var http = require('http');
var fs = require('fs');

// fs functions: rename, unlink (delete), writeFile, appendFilel, open

// Esta funcion crea un archivo
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

// Esta funcion crea el servidor. 
// createServer es una funcion del objeto http a la que hay que pasarle una funcion como argumento
http.createServer(function (req, res) {
		fs.readFile('ejemplo.html', function(err, data){
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();	
		});
}).listen(8080);