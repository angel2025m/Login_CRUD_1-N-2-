import {db} from '../config/db.js';

// Obtener todos los productos
export const obtTodo = async () => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre categoria_nombre
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        ORDER BY p.id DESC
    `);
    return resultado;
};

// Obtener producto por ID
export const obtPorId = async (id) => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre categoria_nombre
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.id = ?
    `, [id]);
    return resultado[0];
};

// Insertar producto con imagen
export const inserta = async (producto) => {
    const { nombre, precio, categoria_id, stock, imagen } = producto;
    const [resultado] = await db.query(
        'INSERT INTO productos(nombre, precio, categoria_id, stock, imagen) VALUES (?,?,?,?,?)',
        [nombre, precio, categoria_id || null, stock || 0, imagen || null]
    );
    return { id: resultado.insertId, ...producto };
};

// Actualizar producto con imagen opcional
export const actualiza = async (id, producto) => {
    const { nombre, precio, categoria_id, stock, imagen } = producto;
    
    // Si hay imagen, actualizar todo
    if (imagen !== undefined) {
        await db.query(
            'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, stock = ?, imagen = ? WHERE id = ?',
            [nombre, precio, categoria_id || null, stock || 0, imagen, id]
        );
    } else {
        // Si no hay imagen, solo actualizar otros campos
        await db.query(
            'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, stock = ? WHERE id = ?',
            [nombre, precio, categoria_id || null, stock || 0, id]
        );
    }
    return { id, ...producto };
};

// Eliminar producto
export const elimina = async (id) => {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    return id;
};

// Obtener productos por categoría
export const obtPorCategoria = async (categoria_id) => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre categoria_nombre
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.categoria_id = ?
    `, [categoria_id]);
    return resultado;
};