import axios from 'axios';

const API_URL = import.meta.env.VITE_API_PRODUCTO;

// Obtener todos los productos
export const ObtenerProductos = async () => {
    const respuesta = await axios.get(`${API_URL}/productos`);
    return respuesta.data;
};

// Enviar producto con imagen
export const EnviarProducto = async (producto) => {
    // Crear FormData para enviar archivo
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    
    // Solo enviar categoria_id si tiene un valor válido
    if (producto.categoria_id && producto.categoria_id !== '') {
        formData.append('categoria_id', producto.categoria_id);
    }
    
    formData.append('stock', producto.stock || 0);
    
    if (producto.imagen) {
        formData.append('imagen', producto.imagen); // Archivo real
    }

    const respuesta = await axios.post(`${API_URL}/productos/adi`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return respuesta.data;
};

// Actualizar producto con imagen opcional
export const ActualizarProducto = async (id, producto) => {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    
    // Solo enviar categoria_id si tiene un valor válido
    if (producto.categoria_id && producto.categoria_id !== '') {
        formData.append('categoria_id', producto.categoria_id);
    }
    
    formData.append('stock', producto.stock || 0);
    
    if (producto.imagen) {
        formData.append('imagen', producto.imagen); // Nueva imagen
    }

    const respuesta = await axios.put(`${API_URL}/productos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return respuesta.data;
};

// Eliminar producto
export const EliminarProducto = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/productos/${id}`);
    return respuesta.data;
};