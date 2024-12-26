
const puntostpmModel = require('../models/formulariotpm_model');


const mostrarPuntosTPM = async (req, res) => {
    const { id_cuarto, id_equipo } = req.params; // Suponiendo que estos vienen en la URL

    try {
        const puntos = await puntostpmModel.getPuntosPorEquipo(id_equipo);

        const id_tpm  = await puntostpmModel.setDetalleTPM(id_equipo);

        console.log("Puntos asociados desde el controlador: ", puntos, id_tpm);
        
        // Renderizar los datos en la vista
        res.render('pages/tpm_form_points', { puntos, id_cuarto,id_equipo, id_tpm});
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

const subirDatosTPM = async (req, res) => {
    const datosTPM = req.body;
    // Validar que los datos existan
    if (!Array.isArray(datosTPM) || datosTPM.length === 0) {
        return res.status(400).json({ error: 'No se recibieron datos válidos' });
    }
    console.log("TPM Data: ", datosTPM);

    try {
        
        // Iterar sobre los datos y llamar al método de inserción del modelo
        for (const registro of datosTPM) {
            const { id_tpm, id_punto, status } = registro;

            // Llamar al método del modelo para insertar cada registro
            const resultadoDetalle = await puntostpmModel.insertarDetalleTPM(id_tpm, id_punto, status);
            const idDetalleTPM = resultadoDetalle.insertId;
            console.log("id_detalle_tpm insertado: ",idDetalleTPM);
        }

        // Responder al cliente con éxito
        res.status(200).json({ message: 'Datos insertados correctamente' });
        
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        
    }
};
/*const subirDatosTPM = async (req, res) => {
    const datosTPM = JSON.parse(req.body.datosTPM || '[]'); // Leer datos del cuerpo de la solicitud
    const imagenesSubidas = req.files || []; // Obtener las imágenes subidas

    if (!Array.isArray(datosTPM) || datosTPM.length === 0) {
        return res.status(400).json({ error: 'No se recibieron datos válidos' });
    }

    try {
        for (const registro of datosTPM) {
            const { id_tpm, id_punto, status, comentario } = registro;

            // Insertar en detalle_tpm
            const resultadoDetalle = await puntostpmModel.insertarDetalleTPM(id_tpm, id_punto, status);

            // Si el status es 'nok', insertar en opl
            if (status.toLowerCase() === 'nok') {
                const idDetalleTPM = resultadoDetalle.insertId; // Obtener el ID generado en detalle_tpm
                console.log("id del punto nok: ",idDetalleTPM);
                // Filtrar imágenes relacionadas con este punto (si es necesario incluir imágenes asociadas)
                const imagenesRelacionadas = imagenesSubidas.filter(imagen =>
                    imagen.originalname.includes(`punto_${id_punto}`)
                );

                // Guardar en la tabla OPL
                if (comentario || imagenesRelacionadas.length > 0) {
                    const rutasImagenes = imagenesRelacionadas.map(img => img.path); // Rutas de las imágenes
                    await puntostpmModel.insertarOPL(idDetalleTPM, comentario, rutasImagenes);
                }
            }
        }

        res.status(200).json({ message: 'Datos e imágenes insertados correctamente' });
    } catch (error) {
        console.error('Error al guardar datos:', error);
        res.status(500).json({ error: 'Error al guardar datos e imágenes en la base de datos' });
    }
};*/

//Aquí se exportan directamente los métodos necesarios del controlador
module.exports = {
    mostrarPuntosTPM,
    subirDatosTPM,
};