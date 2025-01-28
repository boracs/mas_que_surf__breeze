import React from 'react';
import { Link } from '@inertiajs/inertia-react';


const OpcionesIntro = () => {
    const opciones = [
      { texto: 'Clases de Surf', imagen: '/img/sunset_surf.webp', url: '/clases-de-surf' },
      { texto: 'Surftrips', imagen: '/img/trip.jpg', url: '/surftrips' },
      { texto: 'Surfskate', imagen: '/img/surf_skate.webp', url: '/surfskate' },
      { texto: 'Tienda', imagen: '/img/tienda_1.webp', url: '/tienda' },
      { texto: 'Taquillas', imagen: '/img/instalaciones.jpg', url: '/taquillas' },
      { texto: 'Webcam', imagen: '/img/zurriola_webcam.webp', url: 'https://www.zurriolacam.com.es' },
      { texto: 'Ofertas', imagen: '/img/ofertas.webp', url: 'https://www.google.com' },
    ];
  
    return (
      <div className="w-full h-[300px] flex bg-gray-800">
        {opciones.map((opcion, index) => (
         <Link
         key={index}
         href={opcion.url}
         className="relative flex-1 h-full bg-cover bg-center group"
         target="_blank" // Esto abrirá el enlace en una nueva pestaña
         style={{ backgroundImage: `url(${opcion.imagen})` }}
       >
         {/* Capa oscura superpuesta */}
         <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
         {/* Texto centrado con rotación */}
         <span className="absolute inset-0 flex items-center justify-center text-white font-bold transform">
           <span className="text-sm sm:text-base md:text-lg rotate-2">
             {opcion.texto}
           </span>
         </span>
       </Link>
        ))}
      </div>
    );
  };
  
  export default OpcionesIntro;