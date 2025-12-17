import {db} from '../config/db.js';

export const obtTodasCategorias = async () => {
    const [resultado] = await db.query('SELECT * FROM categorias ORDER BY nombre');
    return resultado;
};

export const obtCategoriaPorId = async (id) => {
    const [resultado] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return resultado[0];
};

export const insertaCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query(
        'INSERT INTO categorias(nombre, descripcion) VALUES (?,?)',
        [nombre, descripcion || null]
    );
    return { id: resultado.insertId, ...categoria };
};

export const actualizaCategoria = async (id, categoria) => {
    const { nombre, descripcion } = categoria;
    await db.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion || null, id]
    );
    return { id, ...categoria };
};

export const eliminaCategoria = async (id) => {
    const [productos] = await db.query(
        'SELECT COUNT(*) as total FROM productos WHERE categoria_id = ?',
        [id]
    );
    
    if (productos[0].total > 0) {
        throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
    }
    
    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    return id;
};