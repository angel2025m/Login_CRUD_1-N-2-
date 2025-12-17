import {obtTodo, obtPorId, inserta, actualiza, elimina, obtPorCategoria} from '../modelos/productoModelo.js';
import fs from 'fs';
import path from 'path';

// Mostrar todos los productos
export const muestraProductos = async (req, res) => {
    try {
        const resultado = await obtTodo();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar un producto por ID
export const muestraProducto = async (req, res) => {
    try {
        const resultado = await obtPorId(req.params.id);
        if (!resultado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Insertar producto con imagen
export const insertaProducto = async (req, res) => {
    try {
        const { nombre, precio, categoria_id, stock } = req.body;
        // req.file viene del middleware multer
        const imagen = req.file ? req.file.filename : null;
        
        const resultado = await inserta({
            nombre,
            precio,
            categoria_id,
            stock,
            imagen
        });
        
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar producto con imagen opcional
export const actualizaProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, categoria_id, stock } = req.body;
        const nuevaImagen = req.file ? req.file.filename : null;

        // Si hay nueva imagen, eliminar la anterior
        if (nuevaImagen) {
            const productoAnterior = await obtPorId(id);
            if (productoAnterior && productoAnterior.imagen) {
                const rutaAnterior = path.join('uploads', productoAnterior.imagen);
                if (fs.existsSync(rutaAnterior)) {
                    fs.unlinkSync(rutaAnterior); // Eliminar archivo anterior
                }
            }
        }

        const resultado = await actualiza(id, {
            nombre,
            precio,
            categoria_id,
            stock,
            imagen: nuevaImagen
        });
        
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar producto y su imagen
export const eliminaProducto = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Obtener producto para eliminar su imagen
        const producto = await obtPorId(id);
        if (producto && producto.imagen) {
            const rutaImagen = path.join('uploads', producto.imagen);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen); // Eliminar archivo
            }
        }
        
        await elimina(id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar productos por categoría
export const muestraProductosPorCategoria = async (req, res) => {
    try {
        const resultado = await obtPorCategoria(req.params.categoria_id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};