const Rol = require("../models/rolModel");


const getAllRoles = async (req, res) => {
    try {
        const roles = await Rol.getAll(); // Llama al método del modelo
        //res.status(200).json(roles); // Devuelve la respuesta al cliente
        res.render("../views/pages/roles", { roles }); // Renderiza la vista y pasa los roles
    } catch (err) {
        console.error("Error fetching roles:", err);
        res.status(500).json({ message: "Error fetching roles" });
    }
};

//Aquí se exportan directamente los métodos necesarios del controlador
module.exports = {
    getAllRoles,
};