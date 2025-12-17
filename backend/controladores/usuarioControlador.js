import jwt from 'jsonwebtoken'
import {ObtenerPorEmail,ObtenerPorId,VerificarPassword,crearUsuario} from '../modelos/UsuarioModelo.js'
const generarToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


export const registrarse = async(req,res)=>{
    try{
        const {nombre,email,password,confirmPassword}=req.body
        
        if (!nombre || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                mensaje: 'Por favor completa todos los campos'
            });
        }
        if(password !=confirmPassword){
            return res.status(400).json({success:false,mensaje:'Las contraseñas no coinciden'})
        }
        if(password.length<6){
            return res.status(400).json({success:false,mensaje:'La contraseña debe tener al menos 6 caracteres'})
        }

        const verificarUsuario = await ObtenerPorEmail(email);
        if(verificarUsuario){
            return res.status(400).json({success:false,mensaje:'El email ya esta registrado'})
        }

        const usuario = await crearUsuario(nombre,email,password);
        const token = generarToken(usuario.id);

        res.status(201).json({success:true,mensaje:'Usuario registrado exitosamente',token,usuario})
    
    }catch(error){
         res.status(500).json({
            success: false,
            mensaje: error.message
            });
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({success:false,mensaje:'Porfavor proporciona email y contraseña'})
        }
        const usuario = await ObtenerPorEmail(email);
        if(!usuario){
            return res.status(401).json({success:false,mensaje:'Email o contraseña incorrectos'})
        }
        const esValida = await VerificarPassword(password,usuario.password);
        if(!esValida){
             return res.status(401).json({
                success: false,
                mensaje: 'Email o contraseña incorrectos'
            });
        }
        const token = generarToken(usuario.id);
        res.status(200).json({
            success: true,
            mensaje: 'Sesión iniciada',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    }catch(error){
        res.status(500).json({
        success: false,
        mensaje: error.message
        });
    }
}

export const ObtenerPefil = async(req,res)=>{
    try {
    const usuario = await ObtenerPorId(req.usuario.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: error.message
    });
  }
}

export const logout = (req,res)=>{
     res.status(200).json({
        success: true,
        mensaje: 'Sesión cerrada'
    });
}