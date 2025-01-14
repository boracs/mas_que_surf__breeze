import React from 'react';
import '../../css/producto.css'; // Asegúrate de que la ruta al archivo CSS sea correcta
import Button_anadir from '../components/Boton_anadir';

const Producto = ({ nombre, precio, imagen, unidades }) => {
    const agregarAlCarrito = () => {
        // Lógica para añadir el producto al carrito
        console.log(`${imagen} añadido al carrito.`);
    };

    return (
        <div className="contenedor_producto">
         <img src={`img/${imagen}.jpg`} alt={nombre} className="imagen_producto" />
        { console.log("Nombre de la imagen:", nombre)}
         <h2 className="nombre_producto">{nombre}</h2>
            <p className="precio_producto">{precio} €</p>
            <Button_anadir 
            onClick={() => handleAgregarAlCarrito(producto.id)} 
            label="Agregar al carrito" 
            disabled={unidades === 0}
          />

        </div>
    );
};

export default Producto;