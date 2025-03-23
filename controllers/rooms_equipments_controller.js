const Room = require("../models/rooms_model");


const getAllRooms = async(req, res, next,viewName) => {
    try{
        const rooms = await Room.getAllRooms(); //llamamos al método del modelo Room (Consulta de los cuartos)
        res.render(viewName, { rooms }); // Renderizamos la vista especificada con los datoss

    }catch (err){
        console.error("Error al obtenre los cuartos",err);
        res.status(500).json({message: "Error al obtener los cuartos"})
    }
};

const getAllEquipments = async(req, res, next,viewName) => {
    try{
        const equipments = await Room.getAllEquipments(); //llamamos al método del modelo Room (Consulta de los cuartos)
        const rooms = await Room.getAllRooms();
        res.render(viewName, { equipments, rooms }); // Renderizamos la vista especificada con los datoss

    }catch (err){
        console.error("Error al obtenre los cuartos",err);
        res.status(500).json({message: "Error al obtener los cuartos"})
    }
};

const getEquipmentByRoomId = async (req, res) => {//Obtener los equipos del id del cuarto
    const { roomId } = req.params; // Obtén el roomId desde los parámetros de la URL
    try {
        const equipment = await Room.getEquipmentByRoomId(roomId);
        res.json(equipment); // Devuelve los equipos en formato JSON
    } catch (err) {
        console.error("Error al obtener los equipos:", err);
        res.status(500).json({ message: "Error al obtener los equipos" });
    }
};

const getRoomByEquipmentId = async (req, res) => {//Obtener los equipos del id del cuarto
    const { equipoId } = req.params; // Obtén el equipoId desde los parámetros de la URL
    try {
        const room = await Room.getRoomByEquipmentId(equipoId);
        res.json(room); // Devuelve los equipos en formato JSON
    } catch (err) {
        console.error("Error al obtener los equipos:", err);
        res.status(500).json({ message: "Error al obtener los equipos" });
    }
};

const insertarNuevoEquipo = async (req, res) => {
    const { nombre_equipo, id_cuarto } = req.body; // Captura de los datos enviados

    console.log(id_cuarto, "  ", nombre_equipo);
    try {

        const results = Room.insertarNuevoEquipo(nombre_equipo,id_cuarto);//consulta de inserción del modelo
        res.json(results);
        
        
    } catch (err) {
        console.error("Error al obtener los equipos:", err);
        res.status(500).json({ message: "Error al obtener los equipos" });
    }
};

const deleteEquipment = async (req, res) => {
    try {
        const { id_equipo } = req.params;
        
        // Validar que el ID del equipo es un número
        if (!id_equipo || isNaN(id_equipo)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de equipo inválido' 
            });
        }
        
        // Llamar al modelo para eliminar el equipo
        const deleted = await Room.deleteEquipo(id_equipo);
        
        if (deleted) {
            return res.status(200).json({ 
                success: true, 
                message: 'Equipo eliminado correctamente' 
            });
        } else {
            return res.status(404).json({ 
                success: false, 
                message: 'No se encontró el equipo para eliminar' 
            });
        }
        
    } catch (error) {
        console.error('Error al eliminar equipo:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
};

const modLocalizacion = async(req,res) =>{
    const {id_equipo, id_cuarto} = req.body;

    try{
        const results = Room.modificarLocalizacion(id_equipo,id_cuarto);
        res.json(results);

    }catch(err){
        console.error("Error al modificar la localización del equipo", err);
        res.status(500).json({ message: "Error al modificar la localización del equipo" });
    }
}

//Aquí se exportan directamente los métodos necesarios del controlador
module.exports = {
    getAllRooms,
    getEquipmentByRoomId,
    insertarNuevoEquipo,
    getAllEquipments,
    getRoomByEquipmentId,
    modLocalizacion,
    deleteEquipment,
};