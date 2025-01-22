import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import React from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    resolve: (name) => {
        console.log(`Resolviendo página: ${name}`);
        
        // Verificamos si el nombre contiene 'Auth/' y lo manejamos de forma especial
        if (name.startsWith('Auth/')) {
            // Extraemos la parte después de 'Auth/', por ejemplo 'Login' o 'Register'
            const pageName = name.split('/')[1];  // Obtiene 'Login' o 'Register'
            console.log(`Importando página desde Auth: ${pageName}`);
            return import(`./Pages/Auth/${pageName}.jsx`);  // Importa desde Pages/Auth
        }
        
        // Si no es una página dentro de Auth, cargamos normalmente desde Pages
        console.log(`Importando página desde Pages: ${name}`);
        return import(`./Pages/${name}.jsx`);
    },

    title: (title) => `${title} - ${appName}`,
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});
