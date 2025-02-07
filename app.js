const express = require("express");
const session = require('express-session');
const path = require("path");
const bodyParser = require('body-parser');

const tpm_routes = require("./routes/tpm_routes");


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

app.use(express.json());
// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Directorio donde se guardarán las vistas
//app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); // Para analizar datos JSON enviados en POST
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios codificados en URL

// Ruta para "/"
/*app.get("/", (req, res) => {
    res.render("../views/pages/home"); // Renderiza la vista "home.ejs"
});*/


/*app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bespeak', authRouter);*/

// ruta raiz de todo el proyecto
app.use("/tpm", tpm_routes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




