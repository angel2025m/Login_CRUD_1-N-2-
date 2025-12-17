import { Navigate } from 'react-router-dom';
import { Authenticado } from '../services/autenticacionService';

export default function RutaProtegida({ children }) {
  const estaAutenticado = Authenticado();
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}