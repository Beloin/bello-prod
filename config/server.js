const express = require('express'), // Importa express
    consign = require('consign'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const app = express();

const eventModel = require('../api/models/eventosModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/belloDB')
// {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }

consign()
    .include('middlewares') // Middlewares in Use
    .then('api/routes')
    .then('api/controllers')
    .into(app);

/** Erro de rota Handler */
app.get('*', (req, res, next) => {
    res.status(404);
    res.send('Verificar a requisição');
});

/** Error Handler */
app.use((err, req, res, next) => {
    res.status(500);
    res.send('Erro.');
});

module.exports = app;
