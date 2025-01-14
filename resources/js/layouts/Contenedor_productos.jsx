import React from 'react';
import Producto from '../components/Producto';
import '../../css/contenedor_productos.css'; 

const ContenedorProductos = () => {
    const productos = [
        {
            id: 1,
            nombre: 'Toalla_basica',
            precio: 14.99,
            imagen: 'toalla_basica',
            unidades: 5,
        },
        {
            id: 22,
            nombre: 'Camiseta Surfista',
            precio: 19.99,
            imagen: 'Camiseta_Surfista',
            unidades: 10,
        },
        {
            id: 31,
            nombre: 'Gafas de Sol',
            precio: 49.99,
            imagen: 'gafas_sol',
            unidades: 0,
        },
        {
            id: 43,
            nombre: 'Toalla de Playa',
            precio: 24.99,
            imagen: 'toalla_de_playa',
            unidades: 2,
        },
    
    ];

    return (
    <div>
            <div className="contenedor_productos">
                {productos.map((producto) => (
                    <Producto
                        key={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                        unidades={producto.unidades}
                    />
                ))}
            </div>   
    </div>
    );
};

export default ContenedorProductos;