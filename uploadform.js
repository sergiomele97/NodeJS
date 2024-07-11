var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  if (req.url == '/fileupload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('Error parsing the file upload');
        res.end();
        return;
      }

      // Debugging log
      console.log('Files:', files);

      var uploadedFile = files.filetoupload[0];
      var oldpath = uploadedFile.filepath;
      var newpath = path.join('C:\\Users\\Sergio\\Documents\\Archivos Sergio\\04 Movidas\\NodeJS\\files', uploadedFile.originalFilename);


      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.write('Error moving the uploaded file');
          res.end();
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }
}).listen(8080, function() {
  console.log('Server is listening on port 8080');
});
