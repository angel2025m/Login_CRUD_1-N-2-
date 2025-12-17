import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../modules/dashboard/Dashboard';
import Categoria from '../modules/categoria/Categoria';
import Store from '../modules/store/Store';
import Reporte from '../modules/reporte/reporte';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/store" element={<Store />} />
      <Route path="/reporte" element={<Reporte />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;