import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productoRutas from './rutas/productoRutas.js';
import categoriaRutas from './rutas/categoriaRutas.js';
import estadisticasRutas from './rutas/estadisticasRutas.js';
import autenticacionRutas from './rutas/authenticacionRutas.js';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

// Servir carpeta uploads como archivos estáticos
// Ahora puedes acceder: http://localhost:PORT/uploads/imagen.jpg
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/', productoRutas);
app.use('/', categoriaRutas);
app.use('/', estadisticasRutas);
app.use('/api/auth', autenticacionRutas);

const puerto = process.env.PORT;
app.listen(puerto, () => { 
    console.log(`Servidor en http://localhost:${puerto}`);
});