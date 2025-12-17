import express from 'express';
import {muestraProductos,muestraProducto,insertaProducto,actualizaProducto,eliminaProducto,muestraProductosPorCategoria} from '../controladores/productoControlador.js';
import { subirImagen } from '../middleware/subirImagen.js';

const rutas = express.Router();

// Obtener todos los productos
rutas.get('/productos', muestraProductos);

// Obtener un producto por ID
rutas.get('/productos/:id', muestraProducto);

// Insertar producto con imagen
rutas.post('/productos/adi', 
    subirImagen.single('imagen'), // Middleware para recibir imagen
    insertaProducto
);

// Actualizar producto con imagen opcional
rutas.put('/productos/:id', 
    subirImagen.single('imagen'), // Middleware para recibir imagen
    actualizaProducto
);

// Eliminar producto
rutas.delete('/productos/:id', eliminaProducto);

// Obtener productos por categoría
rutas.get('/productos/categoria/:categoria_id', muestraProductosPorCategoria);

export default rutas;