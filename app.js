const express = require("express");
const session = require('express-session');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');

const rooms_route = require("./routes/rooms_route");
const puntostpm_route = require("./routes/formulariotpm_route");
const imagenes_route = require('./routes/imagenes_route');

const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));


//app.use('/uploads', express.static(path.join(__dirname, 'public')));
// Configuración de sesión
app.use(session({
    secret: 'mi_secreto_super_seguro', // Cambia esto por una clave secreta fuerte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Asegúrate de usar true solo con HTTPS
}));

// Middleware para procesar JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Directorio donde se guardarán las vistas
//app.use(express.static(path.join(__dirname, "public")));


// Ruta para "/"
app.get("/", (req, res) => {
   
    res.render("../views/pages/home"); // Renderiza la vista "home.ejs"
});

// ruta raiz de rooms_route 
app.use("/tpm", rooms_route);

//ruta raiz de los puntos tpm
app.use('/puntos', puntostpm_route);


// Rutas
app.use('/api/puntos', imagenes_route);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




