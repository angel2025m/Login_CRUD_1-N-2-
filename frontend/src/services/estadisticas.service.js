import axios from 'axios'

const URL = import.meta.env.VITE_API_ESTADISTICA
export const ObtenerCantidadPro=async()=>{
    const resultado = await axios.get(`${URL}`)
    return resultado.data;
}