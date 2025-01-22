import React from 'react';
import '../../css/Boton_anadir.css';

const Boton_anadir = ({ onClick, label, disabled }) => (
    <button
        className="boton_agregar"
        onClick={onClick} // Usa la función `onClick` pasada como prop
        disabled={disabled} // Usa el valor de `disabled` pasada como prop
    >
        {disabled ? 'Aún no puedes comprar' : label} {/* Muestra el texto según el estado */}
        {disabled && (
            <span className="tooltip">Para poder comprar, debes tener una taquilla</span> // El tooltip que aparece al hacer hover
        )}
    </button>
);

export default Boton_anadir;