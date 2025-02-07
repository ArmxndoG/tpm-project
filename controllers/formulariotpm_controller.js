
const puntostpmModel = require('../models/formulariotpm_model');


const mostrarPuntosTPM = async (req, res) => {
    const { id_cuarto, id_equipo } = req.params; // Suponiendo que estos vienen en la URL

    try {
        const atributos = await puntostpmModel.getAtributos(id_equipo);
        const ayuda_visual = await puntostpmModel.getAyudaVisual(id_equipo);
        const orden_puntos = await puntostpmModel.getOrdenPuntos(id_equipo);

        console.log("Atriutos: ", atributos);
        // Estructuramos la información por cada `id_punto`
        let puntos = {};

        // Agregar la información de los atributos
        atributos.forEach(attr => {
        const id_punto = attr.id_punto;

        if (!puntos[id_punto]) {
            puntos[id_punto] = {
            id_punto,
            atributos: [],
            ayudas_visuales: [],
            orden: null
            };
        }

        puntos[id_punto].atributos.push({
            titulo: attr.atributo_titulo,
            tipo: attr.atributo_tipo,
            valor: attr.atributo_valor
        });
        });

        // Agregar la información de las ayudas visuales
        ayuda_visual.forEach(ayuda => {
        const id_punto = ayuda.id_punto;

        if (!puntos[id_punto]) {
            puntos[id_punto] = {
            id_punto,
            atributos: [],
            ayudas_visuales: [],
            orden: null
            };
        }

        puntos[id_punto].ayudas_visuales.push(ayuda.ayuda_visual);
        });

        // Agregar la información del orden de los puntos
        orden_puntos.forEach(orden => {
        const id_punto = orden.id_punto;

        if (!puntos[id_punto]) {
            puntos[id_punto] = {
            id_punto,
            atributos: [],
            ayudas_visuales: [],
            orden: null
            };
        }

        puntos[id_punto].orden = orden.orden_punto;
        });

        // Ordenar los puntos por el atributo `orden` de manera ascendente
        const puntosOrdenados = Object.values(puntos).sort((a, b) => a.orden - b.orden);
        puntos = puntosOrdenados;
        console.log("Puntos ordenados: ", JSON.stringify(puntos, null, 2));
        const id_tpm  = await puntostpmModel.insertarTPM(id_equipo);
        
        // Renderizar los datos en la vista
        res.render('pages/user/checklist_tpm', { puntos, id_cuarto,id_equipo, id_tpm});
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

const getPointsByEquipment = async (req, res) => {
    const { id_cuarto, id_equipo } = req.params; // Suponiendo que estos vienen en la URL

    try {
        const result = await puntostpmModel.getPointsByEquipments(id_equipo);
        // Filtrar solo los atributos con `id_atributo: 1`: Actividad
        const puntos = result.filter(punto => punto.id_atributo === 1);
        console.log("puntos: ",puntos);
        res.render('pages/admin/admChecklist_modPoints',{puntos})
        
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

/*const changeOrder = async (req, res) => {
    try {
        const { puntos } = req.body; // Extrae los datos del body correctamente
        console.log("Nuevo orden: ", puntos)

        if (!puntos || !Array.isArray(puntos)) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        await puntostpmModel.updateOrder(puntos);// Llamamos la función para actualizar en la BD

        console.log("Nuevo orden recibido:", puntos);
        res.json({ message: "Orden actualizado con éxito", data: puntos });
    } catch (error) {
        console.error("Error en el backend:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};*/
const changeOrder = async (req, res) => {
    try {
        const { puntos, puntoEliminadoId } = req.body;

        if (puntoEliminadoId) {
            // Marcar como inactivo el punto eliminado
            await puntostpmModel.markInactive(puntoEliminadoId);
        }

        // Reorganizar el orden de los puntos restantes
        if (puntos && puntos.length > 0) {
            await puntostpmModel.updateOrder(puntos);
        }

        res.json({ success: true, message: "Orden actualizado correctamente" });
    } catch (error) {
        console.error("Error en updateOrder:", error);
        res.status(500).json({ success: false, message: "Error al actualizar el orden" });
    }
};


const removePoint = async (req, res) => {
    try {
        const { id_punto } = req.body; // Extrae los datos del body correctamente
        console.log("id_del punto a eliminar: ", id_punto)

        await puntostpmModel.removePoint(id_punto);// Llamamos la función para actualizar en la BD

        // Reorganizar el orden después de la eliminación
        await puntostpmModel.reorderPoints();
        
        res.json({ message: "Punto eliminado con exito" });
    } catch (error) {
        console.error("Error en el backend:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




const subirDatosTPM = async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body);
  
    try {

        //Se extrae el array puntos enviado desde el forndend
        const puntos = req.body.puntos;
  
        console.log('Datos procesados:', puntos);
        
        //Iterar sobre cada punto del arrgelo
        for (const punto of puntos) {
            const { id_tpm, id_punto, estado, comentario } = punto;
    
            // Insertar datos en detalle_tpm
            const resultadoDetalle = await puntostpmModel.insertarDetalleTPM(id_tpm, id_punto, estado);
            const idDetalleTPM = resultadoDetalle.insertId;
    
            // Procesar imágenes si el estado es 'nok'
            if (estado === 'nok') {
                
                // Filtrar los archivos relacionados con el punto actual
                const archivosRelacionados = req.files.filter(file =>
                    file.fieldname === `imagenes_${id_punto}[]`
                );
                console.log("imagenes recibidas: ",archivosRelacionados);

                // Insertar cada archivo relacionado en la base de datos
                if(archivosRelacionados.length > 0){//Si hay imagenes adjuntadas...
                    console.log("Hay imagenes adjuntadas");
                    for (const archivo of archivosRelacionados) {
                        await puntostpmModel.insertarOPL(idDetalleTPM, comentario, archivo.filename);
                    }
                }else{//Si no hay imagenes adjuntadas insertar vacío en la columna fotografa
                    console.log("No hay imagenes adjuntadas")
                    const null_imagen = " ";
                    await puntostpmModel.insertarOPL(idDetalleTPM,comentario,null_imagen);
                }
                
            }
        }
  
        res.status(200).json({ message: 'Datos procesados correctamente' });
    } catch (error) {
      console.error('Error al procesar los datos:', error);
      res.status(500).json({ error: 'Ocurrió un error general al procesar los datos' });
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
    getPointsByEquipment,
    changeOrder,
    removePoint,
};