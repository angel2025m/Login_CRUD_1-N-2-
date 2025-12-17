import {obtTodasCategorias, obtCategoriaPorId,insertaCategoria,actualizaCategoria,eliminaCategoria} from '../modelos/categoriaModelo.js';

export const muestraCategorias = async (req, res) => {
    try {
        const resultado = await obtTodasCategorias();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const muestraCategoria = async (req, res) => {
    try {
        const resultado = await obtCategoriaPorId(req.params.id);
        if (!resultado) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertaNuevaCategoria = async (req, res) => {
    try {
        const resultado = await insertaCategoria(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizaUnaCategoria = async (req, res) => {
    try {
        const resultado = await actualizaCategoria(req.params.id, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminaUnaCategoria = async (req, res) => {
    try {
        await eliminaCategoria(req.params.id);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};