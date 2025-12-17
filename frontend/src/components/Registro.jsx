import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registro } from '../services/autenticacion.service';
import { colors } from '../styles/colors';

export default function Registro({ setEstaAutenticado }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    const resultado = await registro(nombre, email, password, confirmPassword);

    if (resultado.success) {
      setEstaAutenticado(true);
      navigate('/dashboard');
    } else {
      setError(resultado.mensaje);
    }

    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.gray50 }}>
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md" style={{ backgroundColor: colors.white, borderTop: `4px solid ${colors.primary}` }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>Registro</h2>
        {error && <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.gray600 }}>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 rounded focus:outline-none" style={{ backgroundColor: colors.gray100, color: colors.dark, borderLeft: `3px solid ${colors.primary}` }} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.gray600 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded focus:outline-none" style={{ backgroundColor: colors.gray100, color: colors.dark, borderLeft: `3px solid ${colors.primary}` }} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.gray600 }}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded focus:outline-none" style={{ backgroundColor: colors.gray100, color: colors.dark, borderLeft: `3px solid ${colors.primary}` }} required />
          </div>
          <div className="mb-6">
            <label className="block mb-2" style={{ color: colors.gray600 }}>Confirmar Contraseña</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded focus:outline-none" style={{ backgroundColor: colors.gray100, color: colors.dark, borderLeft: `3px solid ${colors.primary}` }} required />
          </div>
          <button type="submit" disabled={cargando} className="w-full font-bold py-2 rounded disabled:opacity-50" style={{ backgroundColor: cargando ? colors.accent : colors.primary, color: colors.white }}>
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="text-center mt-4" style={{ color: colors.gray600 }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: colors.primary }} className="font-bold">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}