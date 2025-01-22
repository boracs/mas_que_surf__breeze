import { usePage, router } from '@inertiajs/react';
import React from 'react';
import '../../css/producto.css'; // Asegúrate de que la ruta al archivo CSS sea correcta
import Boton_anadir from '../components/Boton_anadir';
import { toast } from 'react-toastify';

const Producto = ({ nombre, precio, imagen, unidades, descuento, producto }) => {
    // Usamos usePage para obtener la información de la autenticación
    const { auth } = usePage().props;
    const user = auth?.user; // Accedemos al usuario autenticado


    const handleAgregarAlCarrito = (productoId) => {
        router.post(
            route('carrito.agregar', productoId),  // Cambiar aquí: pasamos el productoId en la URL
            {},
            {
                onSuccess: (response) => {
                    if (response.props.carrito) {
                        setCarrito(response.props.carrito);
                    }
                    toast.success('Producto agregado al carrito');
                },
                onError: () => {
                    toast.error('Hubo un problema al agregar el producto al carrito');
                },
                preserveState: true,
                preserveScroll: true,
            }
        );
    };
    return (
        <div>
            {user ? ( // Si el usuario está autenticado
                <div className="contenedor_producto">
                    <img src={`img/${imagen}.jpg`} alt={nombre} className="imagen_producto" />
                    <h2 className="nombre_producto">{nombre}</h2>
                    <p className="precio_producto">{precio} €</p>
                    <div className='des_preciofinal'>
                        <h3>{parseInt(descuento)}%</h3>
                        <p>{parseFloat(precio - ((descuento / 100) * precio)).toFixed(2)} €</p>
                    </div>
                    <Boton_anadir
                        onClick={() => handleAgregarAlCarrito(producto.id)} 
                        label="Agregar al carrito" 
                        disabled={unidades === 0}
                    />
                </div>
            ) : ( // Si el usuario no está autenticado me desabilitas el boton y añades un mensaje al hover
                <div className="contenedor_producto">
                    <img src={`img/${imagen}.jpg`} alt={nombre} className="imagen_producto" />
                    <h2 className="nombre_producto">{nombre}</h2>
                    <p className="precio_producto">{precio} €</p>
                    <div className='des_preciofinal'>
                        <h3>{parseInt(descuento)}%</h3>
                        <p>{parseFloat(precio - ((descuento / 100) * precio)).toFixed(2)} €</p>
                    </div>
                    <Boton_anadir
                       
                        label="Agregar al carrito" 
                        disabled={true} // Deshabilitado si no está logueado
                    />
                </div>
            )}
        </div>
    );
};


export default Producto;
