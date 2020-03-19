var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(5679, function () {
  console.log('Api running on http://localhost:' + server.address().port);
});
