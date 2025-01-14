

import React from 'react';
import { createRoot } from 'react-dom/client';
import './bootstrap'; // Importa configuraciones adicionales si las tienes
import '../css/app.css'; // Importa tus estilos CSS
import Inicio from '../js/pages/Inicio';


function App() {
    return (
        <div>
            <Inicio/>
        </div>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('No se encontró el elemento con id "app"');
}