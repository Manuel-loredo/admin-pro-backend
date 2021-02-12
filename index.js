require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json() );

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//hace referencia a routes/usuarios
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );
app.use( '/api/login', require('./routes/auth') );

    



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});  