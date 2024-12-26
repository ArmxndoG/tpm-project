const Room = require("../models/rooms_model");


const getAllRooms = async(req,res) => {
    try{
        const rooms = await Room.getAllRooms(); //llamamos al método del modelo Room (Consulta de los cuartos)
        res.render("../views/pages/tpm_form", {rooms}); //devolvemos el resultado obtenido del modelo en una variable

    }catch (err){
        console.error("Error al obtenre los cuartos",err);
        res.status(500).json({message: "Error al obtener los cuartos"})
    }
};

const getEquipmentByRoomId = async (req, res) => {
    const { roomId } = req.params; // Obtén el roomId desde los parámetros de la URL
    try {
        const equipment = await Room.getEquipmentByRoomId(roomId);
        res.json(equipment); // Devuelve los equipos en formato JSON
    } catch (err) {
        console.error("Error al obtener los equipos:", err);
        res.status(500).json({ message: "Error al obtener los equipos" });
    }
};

//Aquí se exportan directamente los métodos necesarios del controlador
module.exports = {
    getAllRooms,
    getEquipmentByRoomId,
};