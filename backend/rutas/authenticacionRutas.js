import express from 'express'
import { registrarse, login, ObtenerPefil, logout } from '../controladores/usuarioControlador.js'
import { verificarToken } from '../middleware/autenticacion.js'

const Router = express.Router();


Router.post('/registro', registrarse)
Router.post('/login', login)

Router.get('/perfil', verificarToken, ObtenerPefil)
Router.post('/logout', verificarToken, logout)

export default Router
