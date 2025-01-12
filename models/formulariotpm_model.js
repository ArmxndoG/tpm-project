const db = require("./db");


const FormularioTPM = {

      //Método para obtener los puntos del tpm asociado al equipo seleccionado agrupado por imagenes asociadas
      getPuntosPorEquipo: async (id_equipo) => {
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
        },

        //Método para insertar un registro nuevo en la tabla 'tpm'
        insertarTPM: async (id_equipo) => {
          
          try {
            const query = `
              INSERT INTO tpm (id_usuario, id_equipo, fecha, estado, confirmacion)
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
            INSERT INTO detalle_tpm (id_tpm, id_punto, status)
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
      
      const status = 'pendiente';
      const query = `
          INSERT INTO opl (id_detalle_tpm, comentario, fotografia, status)
          VALUES (?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [idDetalleTPM, comentario, fotografia, status]);
      return result;
    },

    
      
};

    

      

module.exports = FormularioTPM;