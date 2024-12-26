const db = require("./db");


const Room = {

    //Método para obtener todos los cuartos
    getAllRooms: async () => {
        const query = "SELECT * FROM cuartos";
        try {
            const [results] = await db.query(query); // db.query devuelve una promesa
            //console.log("Los cuartos son: ",results);
            return results; // Devuelve los resultados directamente
        } catch (err) {
            throw err; // Lanza el error para que el controlador lo maneje
        }
    },

    //Método para obtener los equipos asociados al cuarto
    getEquipmentByRoomId: async (roomId) => {
        const query = "SELECT * FROM equipos WHERE id_cuarto = ?";
        try {
            const [results] = await db.query(query, [roomId]);
            //console.log("Los equipos asociados al cuarto con id, ",roomId, "son: ",results);
            return results;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = Room;