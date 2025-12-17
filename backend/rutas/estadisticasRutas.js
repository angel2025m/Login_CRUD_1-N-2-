import {ObtenerCantidadProductos} from '../controladores/estadisticasControlador.js'
import express from 'express'

const Router = express.Router();

Router.get('/estadisticas',ObtenerCantidadProductos)


export default Router