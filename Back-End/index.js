import express, { application } from 'express';
import bodyParser from 'body-parser';

import router from './routes/router.js';
import db from './config/db.js';

const app = express();

//contectar a base de datos
db.authenticate()
    .then(() => console.log('Conectado a la base de datos.'))
    .catch(error => console.log(error));

const port = process.env.PORT || 3000;

//middleware para enviar datos desde el cliente al server.
app.use(express.urlencoded({extended: true})); 
app.use(bodyParser.json());

//ruta base.
app.use('/', router);

app.listen(port, () =>{
    console.log(`Servidor funcionando en el puerto ${port}`)
});