const express = require("express");

//Funciones del controlador rooms_equipments
const { getAllRooms, getEquipmentByRoomId, insertarNuevoEquipo, getAllEquipments, 
    modLocalizacion,getRoomByEquipmentId,} = require("../controllers/rooms_equipments_controller");

//Funciones del controlador formulariotpm
const { mostrarPuntosTPM, subirDatosTPM, getPointsByEquipment, changeOrder, removePoint} = require("../controllers/formulariotpm_controller");



const upload = require('../multer-config') //Configuración de multer

const router = express.Router();

// Función wrapper para pasar la vista deseada al controlador
const renderWithView = (viewName) => {
    return (req, res, next) => getAllRooms(req, res, next, viewName);
};



//Ruta del Home
router.get("/home", (req, res) => {
    res.render("../views/pages/home"); // Renderiza la vista "home.ejs"
});


/**********************************                             
||  Rutas para el usuario         ||  
/**********************************/

router.get("/formInit", renderWithView("../views/pages/user/formInit")); //Formulario inicial del tpm
router.get("/rooms/:roomId/equipment", getEquipmentByRoomId); //Endpoint para obtener los equipos asociados al cuarto

router.get("/checklist/:id_cuarto/:id_equipo", mostrarPuntosTPM)//Enpoint para mostrar los puntos del checklist
router.post('/checklist/data-upload', upload.any(), subirDatosTPM);//Enpoint para subir los datos del checklist

/**********************************                             
||  Rutas para el administrador  ||  
/**********************************/

const modificarLocalizacion = (viewName) => {
    return (req, res, next) => getAllEquipments(req, res, next, viewName);
};


router.get("/admEquipments/", (req, res) => {
    res.render("../views/pages/admin/admEquipments"); // Renderiza la vista "home.ejs"
});
router.get("/admEquipments/addEquipment", renderWithView('../views/pages/admin/addEquipment'));
router.post("/admEquipments/addEquipment/added", insertarNuevoEquipo);


//ALta y modificación de equipos
router.get("/admEquipments/relocateEquipment", modificarLocalizacion('../views/pages/admin/relocateEquipment'));
router.get("/admEquipments/relocateEquipment/:equipoId", getRoomByEquipmentId);
router.post("/admEquipments/relocateEquipment/relocated",modLocalizacion);


//Gestion de checklists
router.get("/admChecklist/", renderWithView('../views/pages/admin/admChecklist'));
router.get("/admChecklist/:id_cuarto/:id_equipo", getPointsByEquipment)//Enpoint para mostrar los puntos del checklist
router.post("/admChecklist/changeOrder", changeOrder)//Enpoint para modificar el orden de los puntos
router.post("/admChecklist/removePoint", removePoint)//Enpoint para modificar el orden de los puntos

module.exports = router;