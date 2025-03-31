
const puntostpmModel = require('../models/formulariotpm_model');
const Room = require('../models/rooms_model');
const fs = require('fs');
const path = require('path');

const mostrarPuntosTPM = async (req, res, viewName) => {
    const { id_cuarto, id_equipo } = req.params; // Suponiendo que estos vienen en la URL

    try {
        // Verificar si ya existe un checklist para este equipo en la semana actual
        //const checklistExistente = await puntostpmModel.hasChecklistThisWeek(id_equipo);
        
        /*if (checklistExistente) {
            // Si ya existe un checklist, devolver una respuesta JSON indicando el error
            return res.status(409).json({ 
                error: true, 
                message: 'Ya se ha realizado el TPM de este equipo esta semana.'
            });
        }*/
        const atributos = await puntostpmModel.getAtributos(id_equipo);
        const ayuda_visual = await puntostpmModel.getAyudaVisual(id_equipo);
        const orden_puntos = await puntostpmModel.getOrdenPuntos(id_equipo);

        // Obtener imagen header actual
        const currentHeader = await puntostpmModel.getHeaderByEquipment(id_equipo);
        console.log("CurrendHeader: ", currentHeader);

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
        res.render(viewName, { puntos, id_cuarto,id_equipo, id_tpm, currentHeader});
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

const verifyChecklist = async (req, res) => {
    const { id_cuarto, id_equipo } = req.params;
    
    try {
        // Verificar si ya existe un checklist
        const checklistExistente = await puntostpmModel.hasChecklistThisWeek(id_equipo);
        
        if (checklistExistente) {
            return res.status(409).json({ 
                error: true, 
                message: 'Ya se ha realizado el TPM de este equipo esta semana.'
            });
        }
        
        // Si no existe, responder con éxito
        res.json({ error: false, message: 'No hay checklist existente para este equipo en la semana actual.' });
    } catch (error) {
        console.error('Error al verificar el checklist:', error);
        res.status(500).json({ error: true, message: 'Error interno del servidor.' });
    }
};


/* Método para que obtiene los puntos asociados al equipo y su respectiva imagen de header*/
const getPointsByEquipment = async (req, res) => {
    const { id_equipo } = req.params; //Extraemos los parámetros de la URL

    try {
        // Llamamos al modelo para obtener los puntos del equipo especificado
        const result = await puntostpmModel.getPointsByEquipments(id_equipo);
        const puntos = [];
        const seenIds = new Set();

        //Obtnemos la imagen del header asociada al equipo
        const imagen_header = await puntostpmModel.getHeaderByEquipment(id_equipo);

        //Filtrar el resultado para obtener el primer atributo de cada punto (para mostrarlo en la lista reordenable)
        for (const item of result) {
        if (!seenIds.has(item.id_punto)) { // Si el punto no ha sido agregado aún
            seenIds.add(item.id_punto);  // Lo marcamos como visto
            puntos.push(item);  // Lo agregamos a la lista final
        }
        }
        
        console.log("Datos filtrados: ",puntos);
        
        res.render('pages/admin/admChecklist_modPoints',{puntos,imagen_header, id_equipo})
        
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

const getDetailsByPoint = async (req, res) => {
    const { id_equipo,id_punto } = req.params; // Suponiendo que estos vienen en la URL
    console.log("Parámetros recibidos: ", req.params)
    try {
        //Atributos asociados al id_punto
        const atributos = await puntostpmModel.getAttributesByPoint(id_punto);

        //Ayudas visuales asociados al id_punto
        const ayudasVisuales = await puntostpmModel.getAyudaVisualByPoint(id_punto);

        //console.log("Atributos obtenidos:", atributos);
        //console.log("Ayudas visuales obtenidas:", ayudasVisuales);

         // Estructurar JSON con los datos
         const data = {
            atributos: atributos,
            ayudasVisuales: ayudasVisuales
        };

        //console.log("JSON ESTRUCTURADO: ",data);
        res.render('pages/admin/pointDetails', {data, id_punto, id_equipo})
        
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

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

/* Método para agregar un punto vacío asociado a un equipo */
/*const addEmptyPoint = async (req, res) => {
    const { id_equipo } = req.body;
    // Usamos un id_categoria por defecto (puedes ajustarlo según tu sistema)
    const id_categoria_default = 1; 

    try {
        // Obtener el máximo orden actual para asignar el siguiente
        const maxOrdenResult = await puntostpmModel.getMaxOrdenByEquipo(id_equipo);
        const nuevoOrden = maxOrdenResult && maxOrdenResult.maxOrden ? maxOrdenResult.maxOrden + 1 : 1;
        
        // Crear un punto vacío con valores predeterminados
        const nuevoPuntoId = await puntostpmModel.createEmptyPoint(id_equipo, id_categoria_default, nuevoOrden);
        
        res.json({ 
            success: true, 
            message: 'Punto creado exitosamente', 
            puntoId: nuevoPuntoId 
        });
    } catch (error) {
        console.error('Error al crear punto vacío:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor.' 
        });
    }
};*/
const addEmptyPoint = async (req, res) => {
    const { id_equipo } = req.body;
    const id_categoria_default = 1; 

    try {
        const maxOrdenResult = await puntostpmModel.getMaxOrdenByEquipo(id_equipo);
        const nuevoOrden = maxOrdenResult && maxOrdenResult.maxOrden ? maxOrdenResult.maxOrden + 1 : 1;
        
        const nuevoPuntoId = await puntostpmModel.createEmptyPoint(id_equipo, id_categoria_default, nuevoOrden);
        
        res.json({ 
            success: true, 
            message: 'Punto creado exitosamente', 
            puntoId: nuevoPuntoId,
            orden: nuevoOrden  // Añadimos el orden
        });
    } catch (error) {
        console.error('Error al crear punto vacío:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor.' 
        });
    }
};
const addImgHeader = async (req, res) => {
    try {
        const { id_equipo } = req.body;
        const file = req.files[0];

        if (!file) {
            return res.status(400).json({ success: false, message: 'No se subió ningún archivo' });
        }

        // Insertar registro en la base de datos usando el nombre de archivo generado por Multer
        await puntostpmModel.addHeaderImage(id_equipo, file.filename);

        res.json({ success: true, message: 'Imagen agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar imagen header:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// Controlador para reemplazar imagen header
const replaceImgHeader = async (req, res) => {
    try {
        const { id_equipo } = req.body;
        const file = req.files[0];
        const BASE_RESOURCE_PATH = 'C:\\Users\\arman\\Desktop\\tpm-server-resources';

        if (!file) {
            return res.status(400).json({ success: false, message: 'No se subió ningún archivo' });
        }

        // Obtener imagen header actual
        const currentHeader = await puntostpmModel.getHeaderByEquipment(id_equipo);
        console.log("header actual: ",currentHeader)
        // Actualizar registro en la base de datos
        await puntostpmModel.replaceHeaderImage(id_equipo, file.filename);

        // Eliminar imagen anterior si existe
        if (currentHeader && currentHeader[0] && currentHeader[0].imagen) {
            const oldImagePath = path.join(BASE_RESOURCE_PATH, 'headers-img', currentHeader[0].imagen);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        res.json({ success: true, message: 'Imagen reemplazada correctamente' });
    } catch (error) {
        console.error('Error al reemplazar imagen header:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
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

const unifiedController = async (req, res) => {
    try {
        const { id_punto, atributos} = req.body;
        const archivosSubidos = req.files ? req.files.map(file => file.filename) : [];
        const imagenesInfo = req.body.imagenesInfo ? JSON.parse(req.body.imagenesInfo) : [];

        console.log("Estructura de imagenesInfo parseada: ",imagenesInfo);

        // Parsear atributos si es un string
        const parsedAtributos = typeof atributos === 'string' ? JSON.parse(atributos) : atributos;

        

        console.log("ID punto:", id_punto);
        console.log("Atributos recibidos:", atributos);
        console.log("Información de imágenes:", imagenesInfo);
        console.log("Archivos subidos:", archivosSubidos);

        // Procesar atributos (nuevos, existentes y eliminados)
         // Procesar atributos (nuevos, existentes y eliminados)
         if (parsedAtributos && parsedAtributos.length > 0) { // Usar parsedAtributos
            for (const atributo of parsedAtributos) { // Usar parsedAtributos
                const { id_atributo, titulo, valor, isNew, isDeleted } = atributo;

                if (isDeleted) {
                    // Eliminar atributo
                    console.log("Eliminando atributo:", id_atributo);
                    await puntostpmModel.deleteAttributeModel(id_punto, id_atributo);
                } else if (isNew) {
                    // Insertar nuevo atributo
                    console.log("Insertando nuevo atributo:", atributo);
                    try {
                        // 1. Primero insertamos en la tabla atributos
                        const nuevoAtributo = await puntostpmModel.insertAttributeModel({
                            titulo: titulo, 
                            tipo: 'texto'
                        });

                        // 2. Luego insertamos en la tabla puntos_atributos
                        await puntostpmModel.insertPuntoAttributeModel({
                            id_punto: id_punto,
                            id_atributo: nuevoAtributo,
                            valor: valor
                        });
                    } catch (error) {
                        console.error("Error al insertar nuevo atributo:", error);
                        throw error;
                    }
                } else {
                    // Actualizar atributo existente
                    console.log("Actualizando atributo:", atributo);
                    await puntostpmModel.updateAttributeModel(id_punto, id_atributo, titulo, valor);
                }
            }
        }

        // Procesar imágenes
        if (imagenesInfo && imagenesInfo.length > 0) {
            let fileIndex = 0;
            for (const info of imagenesInfo) {
                if (info.isNew || info.replaced) {
                    // Asignar el nombre de archivo del archivo subido
                    if (fileIndex < archivosSubidos.length) {
                        const filename = archivosSubidos[fileIndex];
                        fileIndex++;

                        if (info.isNew) {
                            // Insertar nueva imagen
                            console.log("Insertando nueva imagen:", filename);
                            await puntostpmModel.insertAyudaVisualModel(id_punto, filename);
                        } else if (info.replaced && info.id_ayudaVisual) {
                            // Actualizar imagen existente
                            console.log("Reemplazando imagen:", info.id_ayudaVisual, "con:", filename);
                            await puntostpmModel.updateAyudaVisualReplacementModel(info.id_ayudaVisual, filename);
                        }
                    }
                } else if (info.deleted && info.id_ayudaVisual) {
                    // Eliminar imagen
                    console.log("Eliminando imagen:", info.id_ayudaVisual);
                    await puntostpmModel.deleteImageById(info.id_ayudaVisual);
                }
            }
        }

        res.json({
            success: true,
            message: "Modificación de atributos realizada correctamente"
        });
    } catch (error) {
        console.error("Error en el controlador unificado:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar atributos e imágenes",
            error: error.message
        });
    }
};


const subirDatosTPM = async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body);
  
    try {

        //Se extrae el array puntos enviado desde el forndend
        const puntos = req.body.puntos;
        
        console.log('Datos procesados:', puntos);
        console.log("id_tpm: ", puntos[0].id_tpm)
        
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
        const id_tpm = puntos[0].id_tpm;
        //Cambiar el estado de confirmación del check list de 0 a 1 (Confirmación aceptada)
        await puntostpmModel.updateConfirmation(id_tpm);
  
        res.status(200).json({ message: 'Datos procesados correctamente' });
    } catch (error) {
      console.error('Error al procesar los datos:', error);
      res.status(500).json({ error: 'Ocurrió un error general al procesar los datos' });
    }
  };


/*const getOplByEquipmentId = async (req, res) => {
    const { id_equipo } = req.params;
    try {
        console.log(`Buscando OPLs para equipo: ${id_equipo}`); // Debug
        const opl = await puntostpmModel.getOplByEquipmentId(id_equipo);
        
        console.log(`Datos crudos recibidos del modelo:`, opl); // Debug
        
        if (!opl || !Array.isArray(opl)) {
            console.error('Los datos recibidos no son un array:', opl);
            return res.status(404).render('partials/opl-results', { 
                opl: [], 
                id_equipo,
                error: 'Datos no válidos recibidos del servidor'
            });
        }

        const oplFormateados = opl.map(item => ({
            ...item,
            fotografias: item.fotografias && item.fotografias.trim() !== '' ? 
                        item.fotografias.split('|') : 
                        [],
            fecha_legible: item.fecha_completa ? new Date(item.fecha_completa).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Fecha no disponible',
            estado_clase: item.estado_opl === 'abierto' ? 'badge-danger' : 'badge-success'
        }));

        console.log("OPLs formateados:", oplFormateados); // Debug
        
        res.render('partials/opl-results', { 
            opl: oplFormateados, 
            id_equipo: id_equipo,
            error: null
        });
    } catch (err) {
        console.error("Error detallado al obtener OPLs:", {
            message: err.message,
            stack: err.stack,
            requestParams: req.params
        });
        res.status(500).render('partials/opl-results', { 
            opl: [], 
            id_equipo,
            error: `Error al cargar OPLs: ${err.message}`
        });
    }
};*/

/*const getOplByEquipmentId = async (req, res) => {
    const { id_equipo } = req.params;
    try {
        console.log(`Buscando OPLs para equipo: ${id_equipo}`); // Debug
        const rooms = await Room.getAllRooms();
        const opl = await puntostpmModel.getOplByEquipmentId(id_equipo);
        
        
        console.log(`Datos crudos recibidos del modelo:`, opl); // Debug
        
        if (!opl || !Array.isArray(opl)) {
            console.error('Los datos recibidos no son un array:', opl);
        }

        const oplFormateados = opl.map(item => ({
            ...item,
            fotografias: item.fotografias && item.fotografias.trim() !== '' ? 
                        item.fotografias.split('|') : 
                        [],
            fecha_legible: item.fecha_completa ? new Date(item.fecha_completa).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Fecha no disponible',
            estado_clase: item.estado_opl === 'abierto' ? 'badge-danger' : 'badge-success'
        }));

        console.log("OPLs formateados:", oplFormateados); // Debug

        res.render('pages/admin/admOPL', {oplFormateados, rooms})
        
       
    } catch (err) {
        console.error("Error detallado al obtener OPLs: ",err);
        res.status(500)
    }
}*/
const getOplByEquipmentId = async (req, res) => {
    const { id_equipo } = req.params;
    try {
        const opl = await puntostpmModel.getOplByEquipmentId(id_equipo);
        
        if (!opl || !Array.isArray(opl)) {
            return res.status(404).json({ 
                oplFormateados: [], 
                error: 'Datos no válidos'
            });
        }

        const oplFormateados = opl.map(item => ({
            ...item,
            fotografias: item.fotografias && item.fotografias.trim() !== '' ? 
                        item.fotografias.split('|') : [],
            fecha_legible: item.fecha_completa ? new Date(item.fecha_completa).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Fecha no disponible',
            estado_clase: item.estado_opl === 'abierto' ? 'badge-danger' : 'badge-success',
            semana_iso: Number(item.semana_iso) // Asegurar que es número
        }));
        console.log("Opl`s asociados al equipo: ",oplFormateados);

        res.json({ oplFormateados }); // Enviar como JSON
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

const updateOplStatusById = async (req, res) => {
    console.log('Datos recibidos en updateOplStatusById:', req.body);
    
    const { id_detalle_checklist, estado } = req.body;
    
    // Log de los datos específicos
    console.log('id_checklist:', id_detalle_checklist);
    console.log('estado:', estado);
    
    try {
        // Validar que los datos existan
        if (!id_detalle_checklist) {
            console.log('Falta id_checklist');
            return res.status(400).json({ error: 'ID de checklist es requerido' });
        }
        
        // Validar que el estado sea uno de los permitidos
        if (!['abierto', 'cerrado'].includes(estado)) {
            console.log('Estado no válido:', estado);
            return res.status(400).json({ error: 'Estado no válido' });
        }
        
        // Actualizar en la base de datos
        await puntostpmModel.updateOplStatus(id_detalle_checklist, estado);
    
        res.json({ success: true, message: 'OPL actualizado correctamente' });
        
    } catch (error) {
        console.error('Error completo al actualizar estado:', error);
        res.status(500).json({ 
            error: 'Error del servidor', 
            details: error.message 
        });
    }
}


const getMetricasCumplimiento = async (req, res) => {
    const { id_cuarto, semana } = req.params;

    console.log("id_cuarto: ",id_cuarto)
    console.log("Semana: ",semana);

    try {
        const metricas = await puntostpmModel.getMetricasByIdCuarto(id_cuarto, semana);
        console.log("Metricas: ",metricas);
        res.json(metricas);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}


//Aquí se exportan directamente los métodos necesarios del controlador
module.exports = {
    mostrarPuntosTPM,
    subirDatosTPM,
    getPointsByEquipment,
    changeOrder,
    removePoint,
    getDetailsByPoint,
    unifiedController,
    addImgHeader,
    replaceImgHeader,
    addEmptyPoint,
    verifyChecklist,
    getOplByEquipmentId,
    updateOplStatusById,
    getMetricasCumplimiento

};