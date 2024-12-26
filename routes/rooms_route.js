const express = require("express");
const { getAllRooms, getEquipmentByRoomId } = require("../controllers/rooms_controller");

const router = express.Router();

router.get("/tpm_form", getAllRooms);//declaramos la ruta que será consumida por el controlador
router.get("/rooms/:roomId/equipment", getEquipmentByRoomId);



module.exports = router;