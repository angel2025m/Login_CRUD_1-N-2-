import express from 'express';
import {muestraCategorias,muestraCategoria,insertaNuevaCategoria,actualizaUnaCategoria,eliminaUnaCategoria} from '../controladores/categoriaControlador.js';

const rutasCategorias = express.Router();

rutasCategorias.get('/categorias', muestraCategorias);
rutasCategorias.get('/categorias/:id', muestraCategoria);
rutasCategorias.post('/categorias', insertaNuevaCategoria);
rutasCategorias.put('/categorias/:id', actualizaUnaCategoria);
rutasCategorias.delete('/categorias/:id', eliminaUnaCategoria);

export default rutasCategorias;