const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const stockRouter = require('./routes/stock');

// Configuracion Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.get('/', function (req, res) {
    res.json({
        name: 'Stock API',
        endpoints: [
            {
                name: 'stock',
                url: './stocks'
            }
        ]
    })
});

// Configuracion de rutas
app.use('/stocks', stockRouter);

app.listen(4000);
console.log('Express server up!!! port: 4000');