import React from 'react';
import Producto from '../components/Producto'; 
import '../../css/contenedor_productos.css';

const Contenedor_productos = ({ productos }) => {
    return (
        <div className="contenedor_productos">
            {productos.map((producto) => (
                <Producto
                    key={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}  // Asegúrate de que la imagen esté en la forma correcta
                    unidades={producto.unidades}
                    descuento={producto.descuento} // También pasamos el descuento
                    producto={producto} 
                />
            ))}
        </div>
    );
};

export default Contenedor_productos;