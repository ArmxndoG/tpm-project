const express = require("express");

const { 
    uploadOPL, 
    uploadAyudasVisuales, 
    uploadHeaderImages 
  } = require('../multer-config');

//Funciones del controlador rooms_equipments
const { getAllRooms, getEquipmentByRoomId, insertarNuevoEquipo, getAllEquipments, 
    modLocalizacion,getRoomByEquipmentId, deleteEquipment, getOpl, getRooms } = require("../controllers/rooms_equipments_controller");

//Funciones del controlador formulariotpm
const { mostrarPuntosTPM, subirDatosTPM, getPointsByEquipment, 
    changeOrder, addEmptyPoint, getDetailsByPoint, unifiedController, addImgHeader, replaceImgHeader, verifyChecklist,
    getOplByEquipmentId,updateOplStatusById,getMetricasCumplimiento } = require("../controllers/formulariotpm_controller");


const router = express.Router();


/**********************************
||  Controldores compartidos      ||  
/**********************************/

// Funciones para reutilizar controladores en diferentes vistas
const renderWithView = (viewName) => {
    return (req, res, next) => getAllRooms(req, res, next, viewName);
};

const renderWithView2 = (viewName) => {
    return (req, res, next) => mostrarPuntosTPM(req, res, viewName);
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

    router.get("/checklist/:id_cuarto/:id_equipo", renderWithView2("../views/pages/user/checklist_tpm"));//Enpoint para mostrar el checklist asociado al equipo
    router.get('/verificar-checklist/:id_cuarto/:id_equipo', verifyChecklist);//Enpoint para verificar si el checklist ya tiene un registro semanal
    router.post('/checklist/data-upload', uploadOPL.any(), subirDatosTPM);//Enpoint para subir los datos del checklist

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

    router.get("/admEquipments/deleteEquipment", renderWithView("../views/pages/admin/deleteEquipment")); //Formulario inicial del tpm
    router.get("/rooms/:roomId/equipment", getEquipmentByRoomId); //Endpoint para obtener los equipos asociados al cuarto
    router.post("/admEquipments/deleteEquipment/:id_equipo", deleteEquipment);

    //ALta y modificación de equipos
    router.get("/admEquipments/relocateEquipment", modificarLocalizacion('../views/pages/admin/relocateEquipment'));
    router.get("/admEquipments/relocateEquipment/:equipoId", getRoomByEquipmentId);
    router.post("/admEquipments/relocateEquipment/relocated",modLocalizacion);


    //Gestion de checklists
    router.get("/admChecklist/", renderWithView('../views/pages/admin/admChecklist'));
    router.get("/admChecklist/edit/:id_equipo/:id_punto", getDetailsByPoint);
    router.get("/admChecklist/:id_equipo", getPointsByEquipment);
    router.post("/admChecklist/changeOrder", changeOrder)//ruta para modificar el orden de los puntos
    router.post("/admChecklist/addEmptyPoint", addEmptyPoint);//ruta para agregar puntos vacíos
    router.post("/admChecklist/addImgHeader", uploadHeaderImages.any(), addImgHeader)//ruta para añadir una nueva imagen header
    router.post("/admChecklist/replaceImgHeader", uploadHeaderImages.any(), replaceImgHeader)//ruta para reemplazar la imagen header
    router.post('/admChecklist/edit/attributeOrImagesUpload', uploadAyudasVisuales.any(), unifiedController);//ruta para procesar los datos de los atributos


    //Gestión de OPL`s
    //router.get("/admOPL/", renderWithView('../views/pages/admin/admOPL'));
    
    router.get("/admOPL/", getOpl);//Obtiene los cuartos 
    router.get("/admOPL/:id_equipo", getOplByEquipmentId);//Obtiene los opls asociados al id_equipo
    router.post("/admOPL/updateOplStatus",updateOplStatusById);//Actualiza el estado del opl asociado al id_detalle 

    router.get('/admMetricasCumplimiento',  (req,res) =>{//Renderiza la vista inicial de metricas de cumplimiento
        res.render("../views/pages/admin/admMetricasCumplimiento")
    });
    router.get("/api/getRooms", getRooms);//api para obtener los cuartos disponibles
    router.get("/admMetricasCumplimiento/:id_cuarto/:semana", getMetricasCumplimiento)


   
    
    
module.exports = router;