const db = require("./db");


const FormularioTPM = {

      //Método para obtener los puntos del tpm asociado al equipo seleccionado agrupado por imagenes asociadas
      /*getPuntosPorEquipo: async (id_equipo) => {
        try {
            const query = `
              SELECT * 
              FROM view_puntos_por_equipo 
              WHERE id_equipo = ? 
              ORDER BY orden
            `;
            const values = [id_equipo];
            const [rows] = await db.execute(query, values);
            //console.log("Datos antes de ser procesados...", rows);
            // Agrupar las imágenes de un mismo punto
            const puntosAgrupados = rows.reduce((acc, row) => {
                const puntoExistente = acc.find(punto => punto.id_punto === row.id_punto);
                if (puntoExistente) {
                    // Agregar la imagen al arreglo de imágenes
                    puntoExistente.ayuda_visual.push(row.ayuda_visual);
                } else {
                    // Crear un nuevo punto con el arreglo de imágenes
                    acc.push({
                        ...row,
                        ayuda_visual: [row.ayuda_visual]
                    });
                }
                return acc;
            }, []);
            //console.log("puntos por equipo agrupados: ",puntosAgrupados);
            return puntosAgrupados;
            
          } catch (err) {
            console.error('Error al obtener los puntos por equipo:', err);
            throw err;
          }
        },*/

        //Obtenemos los atributos asociados al punto
        getPointsByEquipments: async (id_equipo) =>{

          try{

              const query = `
                  SELECT 
                      p.id_punto,
                      p.id_equipo,
                      p.id_categoria,
                      p.orden,
                      pa.id_atributo,
                      pa.valor
                  FROM puntos_atributos pa
                  JOIN puntos p ON pa.id_punto = p.id_punto
                  WHERE p.id_equipo = ? and p.activo = 1
                  ORDER BY p.orden, pa.id_atributo;
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
              'no' 
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

    /*updateOrder: async (puntos) => {
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
          await db.query(query1); // Paso 1: Poner en NULL los valores
          await db.query(query2); // Paso 2: Asignar los valores correctos
          console.log("Orden actualizado correctamente");
      } catch (error) {
          console.error("Error al actualizar el orden:", error);
          throw error;
      }

  },*/
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
  
  

    
      
};

    

      

module.exports = FormularioTPM;