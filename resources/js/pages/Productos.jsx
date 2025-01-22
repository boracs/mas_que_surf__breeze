import React, { useState } from 'react';

export default function Productos({ productos }) {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleProductoClick = (producto) => {
        setProductoSeleccionado(producto);
        setShowOptions(true);
    };

    const handleEliminar = () => {
        // Aquí iría la lógica para eliminar el producto
        console.log('Eliminar producto', productoSeleccionado);
    };

    const handleModificar = () => {
        // Aquí iría la lógica para modificar el producto
        console.log('Modificar producto', productoSeleccionado);
    };

    const handleCrearNuevoProducto = () => {
        // Aquí iría la lógica para crear un nuevo producto
        console.log('Crear nuevo producto');
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '60vw', overflowY: 'auto', padding: '10px', borderRight: '2px solid #ccc' }}>
                <h2>Productos</h2>
                <div>
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            onClick={() => handleProductoClick(producto)}
                            style={{ cursor: 'pointer', marginBottom: '15px' }}
                        >
                            <img src={producto.imagen} alt={producto.nombre} style={{ width: '100px', height: 'auto' }} />
                            <p>{producto.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>

            {productoSeleccionado && showOptions && (
                <div style={{ width: '40vw', padding: '20px' }}>
                    <h3>Opciones para: {productoSeleccionado.nombre}</h3>
                    <button onClick={handleEliminar}>Eliminar Producto</button>
                    <button onClick={handleModificar}>Modificar Producto</button>
                    <button onClick={handleCrearNuevoProducto}>Crear Nuevo Producto</button>
                </div>
            )}
        </div>
    );
}