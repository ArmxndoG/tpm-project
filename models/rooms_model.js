const db = require("./db");


const Room = {

    //Método para obtener todos los cuartos disponibles
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

    //Método para obtener todos los equipos disponibles
    getAllEquipments: async () => {
        const query = "SELECT * FROM equipos WHERE activo = 1";
        try {
            const [results] = await db.query(query); // db.query devuelve una promesa
            console.log("Equipos: ",results);
            return results; // Devuelve los resultados directamente
        } catch (err) {
            throw err; // Lanza el error para que el controlador lo maneje
        }
    },
    //Método para obtener los equipos asociados al id del cuarto
    getEquipmentByRoomId: async (roomId) => {
        const query = "SELECT * FROM equipos WHERE id_cuarto = ? AND activo = 1";
        try {
            const [results] = await db.query(query, [roomId]);
            //console.log("Los equipos asociados al cuarto con id, ",roomId, "son: ",results);
            return results;
        } catch (err) {
            throw err;
        }
    },
    //Método para obtener el cuarto asociado al id del equipo
    getRoomByEquipmentId: async (equipoId) => {
        const query = "SELECT * FROM vista_equipos_cuartos WHERE id_equipo = ?";
        try {
            const [results] = await db.query(query, [equipoId]);
            console.log("El cuarto asociado al equipo",equipoId," es: ",results);
            return results;
        } catch (err) {
            throw err;
        }
    },

    //Método para insertar un nuevo equipo
    insertarNuevoEquipo: async (nombre_equipo,id_cuarto) => {
        const query = "INSERT INTO equipos (nombre_equipo, id_cuarto) VALUES (?,?)";
        try {
            const [results] = await db.query(query, [nombre_equipo, id_cuarto]);
            console.log("Query de inserción: ",[results])
            //console.log("Los equipos asociados al cuarto con id, ",roomId, "son: ",results);
            return results;
        } catch (err) {
            throw err;
        }
    },

    //Método para insertar un nuevo equipo
    modificarLocalizacion: async (id_equipo,id_cuarto) => {
        const query = "UPDATE equipos SET id_cuarto = ? WHERE id_equipo = ?";
        try {
            const [results] = await db.query(query, [id_cuarto, id_equipo]);
            //console.log("Los equipos asociados al cuarto con id, ",roomId, "son: ",results);
            return results;
        } catch (err) {
            throw err;
        }
    },

 
    deleteEquipo: async (id_equipo) => {
        const query = "UPDATE equipos SET activo = 0 WHERE id_equipo = ?";
        try {
            const [results] = await db.query(query, [id_equipo]);
            //console.log("Query de eliminación: ", [results]);
            return results.affectedRows > 0; // Retorna true si se actualizó al menos una fila
        } catch (err) {
            throw err;
        }
    },
   
};

module.exports = Room;