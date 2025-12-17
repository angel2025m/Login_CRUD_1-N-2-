import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({
        success: false,
        mensaje: 'Token no proporcionado'
      });
    }

    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        mensaje: 'Token expirado'
      });
    }

    res.status(401).json({
      success: false,
      mensaje: 'Token inválido'
    });
  }
};
