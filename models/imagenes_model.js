const db = require('./db');

const PuntosEquipo = {
  // Método para asociar una imagen a un punto
  agregarImagen: async (id_punto, rutaImagen) => {
    try {
        const query = `
        UPDATE puntosxequipo 
        SET ayuda_visual = ? 
        WHERE id_punto = ?
        `;

        const values = [rutaImagen, id_punto];
        await db.execute(query, values);
        return { success: true, message: 'Imagen asociada al punto exitosamente.' };
    } catch (error) {
      console.error('Error al agregar imagen al punto:', error);
      throw error;
    }
  },

  // Obtener imágenes asociadas a un punto
  obtenerImagenesPorPunto: async (id_punto) => {
    try {
        const query = `SELECT ayuda_visual FROM puntosxequipo WHERE id_punto = ?`;
        const [rows] = await db.execute(query, [id_punto]);
      if (rows.length > 0) {
        return JSON.parse(rows[0].ayuda_visual || '[]');
      }
      return [];
    } catch (error) {
      console.error('Error al obtener imágenes del punto:', error);
      throw error;
    }
  }
};

module.exports = PuntosEquipo;
