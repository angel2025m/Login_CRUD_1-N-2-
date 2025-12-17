import {db} from '../config/db.js'
import bcrypt from 'bcryptjs'

export const crearUsuario = async(nombre,email,password)=>{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)
    const [resultado]=await db.query(`INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`,[nombre,email,passwordHash])
    return {
        id:resultado.insertId,
        nombre,
        email
    }
}

export const ObtenerPorEmail=async(email)=>{
    const [usuarios] = await db.query(`SELECT *
                                     FROM usuarios
                                     WHERE email = ?`,[email]);
    return usuarios[0] || null
}
export const ObtenerPorId=async(id)=>{
    const [usuarios]= await db.query(`ELECT id, nombre, email FROM usuarios WHERE id = ?`,[id])
    return usuarios[0] || null;
}
export const VerificarPassword=async(password,passwordHash)=>{
    return await bcrypt.compare(password,passwordHash);
}