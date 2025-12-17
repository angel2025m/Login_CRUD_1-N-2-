import {db} from '../config/db.js'

export const ObtenerCantidadCategoria=async()=>{
     const [resultado]=await db.query(`SELECT c.nombre,COUNT(*) cantidad
                                FROM productos p,categorias c
                                WHERE c.id = p.categoria_id
                                GROUP BY c.nombre`);

    return resultado
}