import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {ObtenerCantidadPro} from '../../../services/estadisticas.service';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      font: {
        size: 16
      }
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

const GraficaBarras = () => {
    const [data, SetData] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cargarDatos = async () => {
        try {
            const respuesta = await ObtenerCantidadPro();
            const nombres = respuesta.map(item => item.nombre);
            const cantidades = respuesta.map(item => item.cantidad);
            
            const datosGrafica = {
                labels: nombres,
                datasets: [{
                    data: cantidades,
                    backgroundColor: [
                        '#FF6B6B',
                        '#4ECDC4',
                        '#45B7D1',
                        '#FFA07A',
                        '#98D8C8',
                        '#F7DC6F'
                    ]
                }]
            }
            SetData(datosGrafica)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, [])

    const chartOptions = {
        ...options,
        indexAxis: isMobile ? 'y' : 'x',
    };

    return data && <Bar options={chartOptions} data={data} />;
}

export default GraficaBarras