import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import AppRoutes from './routes/AppRoutes';
import Login from './components/Login';
import Registro from './components/Registro';
import { colors } from './styles/colors';
import { Authenticado } from './services/autenticacion.service';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verificarAuth = () => {
      const autenticado = Authenticado();
      setEstaAutenticado(autenticado);
      setCargando(false);
    };

    verificarAuth();

    const handleStorageChange = () => {
      verificarAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (cargando) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  const rutasPublicas = ['/login', '/registro'];
  const esRutaPublica = rutasPublicas.includes(location.pathname);

  if (!estaAutenticado && !esRutaPublica) {
    return <Navigate to="/login" replace />;
  }

  if (esRutaPublica) {
    return (
      <Routes>
        <Route path="/login" element={<Login setEstaAutenticado={setEstaAutenticado} />} />
        <Route path="/registro" element={<Registro setEstaAutenticado={setEstaAutenticado} />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.gray50 }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="lg:ml-72">
        <Topbar setIsOpen={setSidebarOpen} />
        <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <AppRoutes />
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;