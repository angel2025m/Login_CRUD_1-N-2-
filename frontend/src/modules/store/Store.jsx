import { useEffect, useState } from "react"
import {ObtenerProductos,EnviarProducto,EliminarProducto,ActualizarProducto} from '../../services/producto.service'
import {ObtenerCategorias} from '../../services/categoria.service'
import { Pencil,Trash } from 'lucide-react';
import Swal from 'sweetalert2'

const store = () => {
    const [productos, SetProductos] = useState([]);
    const [categorias, SetCategorias] = useState([]);
    const [Abrir, SetAbrir] = useState(false);
    const [formData, SetformData] = useState({
        nombre: '',
        precio: '',
        categoria_id: '',
        stock: 0
    })
    const [modoEdicion, SetModoEdicion] = useState(false)
    const [productoEditado, SetProductoEditado] = useState(null);
    
    // Nuevos estados para manejo de imagen
    const [archivoImagen, setArchivoImagen] = useState(null);
    const [previewImagen, setPreviewImagen] = useState('');

    const CambioEntrada = (e) => {
        const {name, value} = e.target;
        SetformData({
            ...formData,
            [name]: value
        })
    }

    // Manejar selección de imagen
    const manejarCambioImagen = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setArchivoImagen(archivo);
            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImagen(reader.result);
            };
            reader.readAsDataURL(archivo);
        }
    }

    useEffect(() => {
        const cargarDatos = async () => {
            const resultadoProductos = await ObtenerProductos();
            SetProductos(resultadoProductos);
            
            const resultadoCategorias = await ObtenerCategorias();
            console.log(resultadoCategorias)
            SetCategorias(resultadoCategorias);
        }
        cargarDatos();
    }, [])

    // Función para resetear el formulario
    const resetearFormulario = () => {
        SetformData({
            nombre: '',
            precio: '',
            categoria_id: '',
            stock: 0
        });
        setArchivoImagen(null);
        setPreviewImagen('');
        SetModoEdicion(false);
        SetProductoEditado(null);
    }

    const CrearProducto = async (e) => {
        e.preventDefault();
        try {
            if (modoEdicion) {
                // Actualizar producto
                await ActualizarProducto(productoEditado, {
                    nombre: formData.nombre,
                    precio: formData.precio,
                    categoria_id: formData.categoria_id,
                    stock: formData.stock,
                    imagen: archivoImagen // Enviar archivo si existe
                })
                const resultado = await ObtenerProductos();
                SetProductos(resultado);
                SetAbrir(false)
                resetearFormulario();
                Swal.fire({
                    title: "¡Actualizado Correctamente!",
                    icon: "success",
                    draggable: true,
                    timer: 4000,
                    showCancelButton: false
                });
            } else {
                // Crear producto
                if (formData.nombre === '' || formData.precio === '') {
                    return Swal.fire({
                        title: "¡No se aceptan campos vacíos!",
                        icon: "error",
                        draggable: true,
                        timer: 4000,
                        showCancelButton: false
                    });
                }
                await EnviarProducto({
                    nombre: formData.nombre,
                    precio: formData.precio,
                    categoria_id: formData.categoria_id || null,
                    stock: formData.stock || 0,
                    imagen: archivoImagen // Enviar archivo
                })
                const resultado = await ObtenerProductos();
                SetProductos(resultado);
                resetearFormulario();
                SetAbrir(false);
                Swal.fire({
                    title: "¡Se creó exitosamente!",
                    icon: "success",
                    draggable: true,
                    timer: 4000
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al procesar la solicitud",
                icon: "error",
                draggable: true,
                timer: 4000
            });
        }
    }

    const AbrirModalEditar = (producto) => {
        SetModoEdicion(true)
        SetProductoEditado(producto.id)
        SetformData({
            nombre: producto.nombre,
            precio: producto.precio,
            categoria_id: producto.categoria_id || '',
            stock: producto.stock || 0
        })
        // Mostrar imagen actual si existe
        if (producto.imagen) {
            setPreviewImagen(`http://localhost:3001/uploads/${producto.imagen}`);
        } else {
            setPreviewImagen('');
        }
        setArchivoImagen(null);
        SetAbrir(true);
    }

    const AbrirModalCrear = () => {
        resetearFormulario();
        SetAbrir(true);
    }

    const CerrarModal = () => {
        SetAbrir(false);
        resetearFormulario();
    }

    const EliminarProductos = async (id) => {
        Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            text: "No podrás revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await EliminarProducto(id);
                    const resultado = await ObtenerProductos();
                    SetProductos(resultado);
                    Swal.fire({
                        title: "¡Se eliminó exitosamente!",
                        icon: "success",
                        draggable: true,
                        timer: 4000,
                        showCancelButton: false
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo eliminar el producto",
                        icon: "error",
                        draggable: true,
                        timer: 4000
                    });
                }
            }
        });
    }
    
    return (
        <div className="p-4 md:p-0">
            <div className="flex justify-end">
                <button onClick={AbrirModalCrear} className="border p-2 border-gray-300 rounded-xl hover:bg-[#2C7873] hover:text-white hover:border-[#2C7873] mb-4">Crear Producto</button>
            </div>
            <div className="border border-gray-300 rounded-2xl p-4 shadow-2xl shadow-gray-300 overflow-x-auto">
                <table className="table-auto w-full border-separate border-spacing-x-5">
                    <thead>
                        <tr>
                            <th className="bg-gray-300 py-3 border-gray-400 rounded-xl font-mono text-sm md:text-base">id</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono text-sm md:text-base">imagen</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono text-sm md:text-base">nombre</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono text-sm md:text-base">precio</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono text-sm md:text-base">categoría</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono text-sm md:text-base">stock</th>
                            <th className="bg-gray-300 rounded-xl font-mono text-sm md:text-base">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="font-mono text-center py-2 text-sm md:text-base">{producto.id}</td>
                                    <td className="flex justify-center items-center py-2">
                                        {producto.imagen ? (
                                            <img 
                                                src={`http://localhost:3001/uploads/${producto.imagen}`}
                                                alt={producto.nombre}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                                Sin imagen
                                            </div>
                                        )}
                                    </td>
                                    <td className="font-mono text-center text-sm md:text-base">{producto.nombre}</td>
                                    <td className="font-mono text-center text-sm md:text-base">{producto.precio} Bs</td>
                                    <td className="font-mono text-center text-sm md:text-base">{producto.categoria_nombre || 'Sin categoría'}</td>
                                    <td className="font-mono text-center text-sm md:text-base">{producto.stock}</td>
                                    <td className="flex justify-center gap-2 items-center py-2">
                                        <Pencil onClick={() => AbrirModalEditar(producto)} className="hover:text-green-500 cursor-pointer" size={20} />
                                        <Trash onClick={() => EliminarProductos(producto.id)} className="hover:text-red-700 cursor-pointer" size={20}/>
                                    </td>
                                </tr>
                            ))   
                        }
                    </tbody>
                </table>
            </div>
            {
                Abrir && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 md:p-0 z-50">
                        <div className="bg-amber-50 w-full md:w-96 rounded-2xl max-h-[90vh] overflow-y-auto">
                            {
                                modoEdicion ? (
                                    <div className="w-full rounded-t-2xl bg-[#2C7873] py-4 text-white">
                                        <h3 className="text-center font-mono">Editar Producto</h3>
                                    </div>
                                ) : (
                                    <div className="w-full rounded-t-2xl bg-[#2C7873] py-4 text-white">
                                        <h3 className="text-center font-mono">Crear nuevo Producto</h3>
                                    </div>
                                )
                            }
                            <div className="px-6 md:px-10 mt-6 pb-6">
                                <form className="flex flex-col gap-3" onSubmit={CrearProducto}>
                                    <label className="font-mono">Nombre:</label>
                                    <input 
                                        type="text" 
                                        onChange={CambioEntrada} 
                                        name="nombre" 
                                        value={formData.nombre} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    <label className="font-mono">Precio:</label>
                                    <input 
                                        type="number" 
                                        onChange={CambioEntrada} 
                                        name="precio" 
                                        value={formData.precio} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    <label className="font-mono">Categoría:</label>
                                    <select 
                                        onChange={CambioEntrada} 
                                        name="categoria_id" 
                                        value={formData.categoria_id}
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                        ))}
                                    </select>
                                    
                                    <label className="font-mono">Stock:</label>
                                    <input 
                                        type="number" 
                                        onChange={CambioEntrada} 
                                        name="stock" 
                                        value={formData.stock} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />

                                    <label className="font-mono">Imagen:</label>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        onChange={manejarCambioImagen}
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    {previewImagen && (
                                        <div className="mt-2">
                                            <p className="font-mono text-sm mb-2">Vista previa:</p>
                                            <img 
                                                src={previewImagen} 
                                                alt="Preview" 
                                                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                                            />
                                        </div>
                                    )}
                                </form>
                                <div className="flex justify-end gap-4 mt-6">
                                    {modoEdicion ? (
                                        <button type="button" onClick={CrearProducto} className="border px-4 py-1 rounded-2xl hover:bg-[#2C7873] hover:border-[#2C7873] hover:text-white">Editar</button>
                                    ) : (
                                        <button type="button" onClick={CrearProducto} className="border px-4 py-1 rounded-2xl hover:bg-[#2C7873] hover:border-[#2C7873] hover:text-white">Crear</button>
                                    )}
                                    <button type="button" onClick={CerrarModal} className="border px-4 py-1 rounded-2xl hover:bg-red-600 hover:border-red-600 hover:text-white">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default store