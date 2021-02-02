const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')

require('dotenv').config();

const app = express();


//CORS
app.use(cors());

// Directorio publico
app.use( express.static('public'));

//Crear el servidor de express
app.use( express.json() );

//Base de datos
dbConnection();



//Rutas
// ruta de autentificacion
app.use('/api/auth', require('./routes/auth.routes'));

// ruta de platillos
app.use('/api/admin/dish', require('./routes/dish.routes'));

// ruta de secciones
app.use('/api/admin/section', require('./routes/section.routes'));


// ruta de compras por usuario
app.use('/api/user/shoppings', require('./routes/shoppingsUser.routes'));




//Escuchar peticiones 
app.listen( process.env.PORT, ( ) => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});