const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

let modulo = require('./Contenedor.js');
let contenedor = new modulo.Contenedor('productos.txt');

app.use(express.urlencoded({extended: true}));

let producto = [];

app.set('view engine', 'hbs');
app.set('views', './views');

//Por defecto toma ext: handlebars y layouts/main.handlebars
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
);

app.get('/', (req, res) => {
    res.render('form', {producto});
});

app.get('/productos', (req, res) => {
    contenedor.getAll().then((result) => {
        producto = result;
        res.render('vista', {producto});
    })
});

app.post('/productos', (req, res) => {
    const {title, price, thumbnail} = req.body;
    
    const obj = {
        'title': title,
        'price': price,
        'thumbnail': thumbnail
    }

    async function ejecutarSave(argObj){
        await contenedor.save(argObj);
        }
    ejecutarSave(obj); 

    res.redirect('/');
});

app.listen(8080, () => {
    console.log('Servidor levantado');
});