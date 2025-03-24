const db = require("./db");


const FormularioTPM = {

  //Obtenemos los atributos de todos los puntos asociados al id_equipo
  getPointsByEquipments: async (id_equipo) =>{

    try{
        // Consulta SQL para obtener los puntos del equipo, junto con su primer atributo si existe
        const query = `
            SELECT 
                p.id_punto,
                p.id_equipo,
                p.id_categoria,
                p.orden,
                COALESCE(pa.id_atributo, NULL) AS id_atributo, 
                COALESCE(pa.valor, 'Punto vacío') AS valor
            FROM puntos p
            LEFT JOIN puntos_atributos pa ON pa.id_punto = p.id_punto
            WHERE p.id_equipo = ? AND p.activo = 1
            ORDER BY p.orden, pa.id_atributo;
          `;
          const values = [id_equipo];
          const [rows] = await db.execute(query, values);
          console.log("Consulta de los atributos: ",rows);
          return rows;

    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },

  hasChecklistThisWeek: async (id_equipo) => {
    const query = `
        SELECT COUNT(*) AS count 
        FROM checklist 
        WHERE id_equipo = ? AND confirmacion = 1 
        AND WEEK(fecha, 1) = WEEK(CURDATE(), 1)
        AND YEAR(fecha) = YEAR(CURDATE())
    `;
    try {
        const [results] = await db.query(query, [id_equipo]);
        return results[0].count > 0; // Retorna true si ya hay un checklist en la semana actual
    } catch (err) {
        throw err;
    }
},
  getHeaderByEquipment: async (id_equipo) =>{

    try{
        // Consulta SQL para obtener los puntos del equipo, junto con su primer atributo si existe
        const query = `
            SELECT imagen FROM header WHERE id_equipo = ?
          `;
          const values = [id_equipo];
          const [rows] = await db.execute(query, values);
          return rows;

    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },

  //Obtenemos los atributos asociados unicamente al id_punto
  getAttributesByPoint: async (id_punto) =>{

    try{

        const query = `
            SELECT a.id_atributo, a.titulo, a.tipo, pa.valor
            FROM puntos_atributos pa
            INNER JOIN atributos a ON pa.id_atributo = a.id_atributo
            WHERE pa.id_punto = ?
          `;
          const values = [id_punto];
          const [rows] = await db.execute(query, values);
          //console.log("Consulta de los atributos: ",rows);
          return rows;

    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },

  //Obtenemos los atributos asociados unicamente al id_punto
  getAyudaVisualByPoint: async (id_punto) =>{

    try{

        const query = `
            SELECT id_ayudaVisual, imagen
            FROM ayudavisual
            WHERE id_punto = ?
          `;
          const values = [id_punto];
          const [rows] = await db.execute(query, values);
          //console.log("Consulta de los atributos: ",rows);
          return rows;

    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },


  //Obtenemos los atributos asociados al punto
  getAtributos: async (id_equipo) =>{

    try{

        const query = `
            SELECT 
                p.id_punto,
                a.titulo AS atributo_titulo,
                a.tipo AS atributo_tipo,
                pa.valor AS atributo_valor
            FROM 
                puntos p
            LEFT JOIN 
                puntos_atributos pa ON p.id_punto = pa.id_punto
            LEFT JOIN 
                atributos a ON pa.id_atributo = a.id_atributo
            WHERE 
                p.id_equipo = ? and p.activo = 1
            ORDER BY 
                p.id_punto ASC, pa.id_pa ASC;
          `;
          const values = [id_equipo];
          const [rows] = await db.execute(query, values);
          //console.log("Consulta de los atributos: ",rows);
          return rows;

    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },
  //Obtenemos las ayudas visuales asociadas al punto
  getAyudaVisual: async (id_equipo) =>{

    try{
        const query = `
          SELECT 
              av.id_punto,
              av.imagen AS ayuda_visual
          FROM 
              ayudavisual av
          WHERE 
              av.id_punto IN (SELECT p.id_punto FROM puntos p WHERE p.id_equipo = ? and p.activo = 1) 
          ORDER BY 
              av.id_punto ASC;
        `;
        const values = [id_equipo];
        const [rows] = await db.execute(query, values);
        //console.log("Ayuda visual asociada al punto: ",rows);
        return rows;


    } catch (err){
      console.error('Error al obtener los puntos por equipo:', err);
      throw err;
    }
  },

    //Obtenemos el orden de los puntos
    getOrdenPuntos: async (id_equipo) =>{

      try{
          const query = `
            SELECT 
                p.id_punto,
                p.orden AS orden_punto
            FROM 
                puntos p
            WHERE 
                p.id_equipo = ? and p.activo = 1
            ORDER BY 
                p.orden ASC;
          `;
          const values = [id_equipo];
          const [rows] = await db.execute(query, values);
          console.log("Orden de los puntos: ",rows);
          return rows;


      } catch (err){
        console.error('Error al obtener los puntos por equipo:', err);
        throw err;
      }
    },

    //Método para insertar un registro nuevo en la tabla 'tpm'
    insertarTPM: async (id_equipo) => {
      
      try {
        const query = `
          INSERT INTO checklist (id_usuario, id_equipo, fecha, estado, confirmacion)
          VALUES (?, ?, ?, ?, ?)
        `;
        const fechaActual = new Date();
        const fechaLocal = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');

        const values = [
          1, // Valor por defecto para id_usuario - (username del SSO en el futuro)
          id_equipo, 
          fechaLocal,
          'pendiente', 
          0 
        ];
        
        const [result] = await db.query(query, values);
        const id_tpm = result.insertId;
        console.log('Registro insertado con ID:', id_tpm);
        return id_tpm;//retornar el id del tpm 
      } catch (error) {
        console.error('Error al insertar datos en TPM:', error);
      }
  },
    //Método para insertar los estados de los puntos en la tabla 'detalle_tpm'
    insertarDetalleTPM: async (id_tpm_detalle, id_punto, status) => {
        
      try {
          const query = `
            INSERT INTO detalle_checklist (id_tpm, id_punto, status)
            VALUES (?, ?, ?)
          `;

          const values = [
            id_tpm_detalle, 
            id_punto, 
            status,
            
          ];
          
        const [result] = await db.query(query, values);
        return result; // Devolver resultado si es necesario

      } catch (error) {
        console.error('Error al insertar datos en TPM:', error);
        throw error; // Lanzar el error para manejarlo en el controlador
      }
  },
  //Método para insertar los comentarios y las imagenes de los puntos 'nok' en la tabla 'opl'
  insertarOPL: async (idDetalleTPM, comentario, fotografia) => {
    
    const status = 'abierto';
    const query = `
        INSERT INTO opl (id_detalle_tpm, comentario, fotografia, status)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [idDetalleTPM, comentario, fotografia, status]);
    return result;
  },

    // Marcar el punto como inactivo en la base de datos
    markInactive: async (idPunto) => {
      const query = `UPDATE puntos SET activo = 0 WHERE id_punto = ?`;
      try {
          await db.query(query, [idPunto]);
          console.log(`Punto ${idPunto} marcado como inactivo`);
      } catch (error) {
          console.error("Error al marcar el punto como inactivo:", error);
          throw error;
      }
  },
// Actualizar el orden de los puntos en la base de datos
  updateOrder: async (puntos) => {
    if (!puntos || puntos.length === 0) return;

    const updates = puntos.map(p => `WHEN id_punto = ${p.id} THEN ${p.orden}`).join(" ");
    const ids = puntos.map(p => p.id).join(", ");

    const query1 = `UPDATE puntos SET orden = -1 WHERE id_punto IN (${ids})`;
    const query2 = `
        UPDATE puntos
        SET orden = CASE ${updates} END
        WHERE id_punto IN (${ids})
    `;

    try {
        await db.query(query1); // Paso 1: Asignar temporalmente un valor inválido
        await db.query(query2); // Paso 2: Asignar los valores correctos
        console.log("Orden actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el orden:", error);
        throw error;
    }
  },
  removePoint: async (id_punto) => {

    const query = "UPDATE puntos SET activo = 0 WHERE id_punto = ?";
    try {
        const [results] = await db.query(query, [id_punto]);
        //console.log("Los equipos asociados al cuarto con id, ",roomId, "son: ",results);
        return results;
    } catch (err) {
        throw err;
    }

  },

    updateAttributeModel: async (id_punto, id_atributo, titulo, valor) => {
      
      try {
          // Actualizar el título en la tabla `atributos`
          const queryTitulo = "UPDATE atributos SET titulo = ? WHERE id_atributo = ?";
          await db.query(queryTitulo, [titulo, id_atributo]);

          // Actualizar el valor en la tabla `puntos_atributos`
          const queryValor = "UPDATE puntos_atributos SET valor = ? WHERE id_punto = ? AND id_atributo = ?";
          await db.query(queryValor, [valor, id_punto,id_atributo]);

      } catch (error) {
    
          throw error;
      }
  },


  insertAttributeModel: async (atributoData) => {
    try {
        const query = `
            INSERT INTO atributos (titulo, tipo) VALUES (?, ?)
        `;
        const values = [atributoData.titulo, atributoData.tipo];
        const [result] = await db.query(query, values);

        const id_atributo = result.insertId;
        console.log("id del nuevo atributo agregado: ",id_atributo);
        return id_atributo;
    } catch (error) {
        console.error('Error en insertAttributeModel:', error);
        throw error;
    }
},

/**
 * Inserta una nueva relación punto-atributo en la tabla puntos_atributos
 * @param {Object} puntoAtributoData - Datos de la relación punto-atributo
 * @returns {Promise<Object>} La relación insertada
 */
insertPuntoAttributeModel: async (puntoAtributoData) => {
    try {
        const query = `
            INSERT INTO puntos_atributos (id_punto, id_atributo, valor) VALUES (?, ?, ?)
        `;
        const values = [
            puntoAtributoData.id_punto,
            puntoAtributoData.id_atributo,
            puntoAtributoData.valor
        ];
        console.log("valores", values);
        const [result] = await db.query(query, values);
        
        return result;
    } catch (error) {
        console.error('Error en insertPuntoAttributeModel:', error);
        throw error;
    }
},

deleteAttributeModel: async (id_punto, id_atributo) => {
  try {
      const query = `
          DELETE FROM puntos_atributos WHERE id_punto = ? AND id_atributo = ?
      `;
      const values = [id_punto, id_atributo];
      const [result] = await db.query(query, values);
      
      return result;
  } catch (error) {
      console.error('Error en insertPuntoAttributeModel:', error);
      throw error;
  }
},



  insertAyudaVisualModel: async (id_punto, imagen) => {
      
    try {
        // Actualizar el título en la tabla `atributos`
        const query = "INSERT INTO ayudavisual (id_punto, imagen) VALUES (?, ?)";
        await db.query(query, [id_punto, imagen]);


    } catch (error) {
  
        throw error;
    }
},

updateAyudaVisualReplacementModel: async (id_ayudaVisual, imagen) => {
      
  try {
      // Actualizar el título en la tabla `atributos`
      const query = "UPDATE ayudavisual SET imagen = ? WHERE id_ayudavisual = ?";
      await db.query(query, [imagen, id_ayudaVisual]);


  } catch (error) {

      throw error;
  }
},
  deleteImageById : async (id_ayudaVisual) => {
    // Realiza la consulta para eliminar la imagen con id_ayudaVisual del punto específico
    const query = 'DELETE FROM ayudavisual WHERE id_ayudaVisual = ?';
    const values = [id_ayudaVisual];
    await db.execute(query, values);
  },

  addHeaderImage : async (id_equipo, imagen) => {
    const query = 'INSERT INTO header (id_equipo, imagen) VALUES (?, ?)';
    try {
        const [result] = await db.query(query, [id_equipo, imagen]);
        return result;
    } catch (error) {
        console.error('Error al insertar imagen header:', error);
        throw error;
    }
  },
  // Método para reemplazar imagen header
  replaceHeaderImage: async (id_equipo, imagen) => {
    const query = 'UPDATE header SET imagen = ? WHERE id_equipo = ?';
    try {
        const [result] = await db.query(query, [imagen, id_equipo]);
        return result;
    } catch (error) {
        console.error('Error al reemplazar imagen header:', error);
        throw error;
    }
  },


  getMaxOrdenByEquipo : async (id_equipo) => {
    try {
        const [rows] = await db.query(
            'SELECT MAX(orden) as maxOrden FROM puntos WHERE id_equipo = ? AND activo = 1',
            [id_equipo]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
},

/* Crear un punto vacío asociado a un equipo */
createEmptyPoint: async (id_equipo, id_categoria, orden) => {
    try {
        // Iniciar transacción
        await db.query('START TRANSACTION');
        
        // Insertar el punto base
        const [result] = await db.query(
            'INSERT INTO puntos (id_equipo, id_categoria, orden, activo) VALUES (?, ?, ?, 1)',
            [id_equipo, id_categoria, orden]
        );
        
        const id_punto = result.insertId;
        
        // Confirmar transacción
        await db.query('COMMIT');
        
        return id_punto;
    } catch (error) {
        // Revertir cambios si hay error
        await db.query('ROLLBACK');
        throw error;
    }
},

updateConfirmation: async (id_tpm) => {
      
  try {
      // Actualizar el estado de confirmación del checklist de 0 a 1
      const query = "UPDATE checklist SET confirmacion = 1 WHERE id_checklist = ?";
      await db.query(query, [id_tpm]); 

  } catch (error) {

      throw error;
  }
},

    
      
};
module.exports = FormularioTPM;