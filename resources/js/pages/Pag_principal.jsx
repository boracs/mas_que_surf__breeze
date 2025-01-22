import React from 'react';
import Layout1 from '../layouts/Layout1';
import '../../css/pagina_principal.css';
import Contenedor_productos from '../layouts/Contenedor_productos';
import { Head } from '@inertiajs/react';
import Contenedor_opciones from'../layouts/Contenedor_opciones';

const Pag_principal = ({ productos}) => (
    <div>
        <Layout1 >
            <Head>
                <title>Página Principal</title>
                <meta name="description" content="Explora nuestros productos disponibles" />
            </Head>
            <main>
            <div className='contenedor_del_contenedor_opciones'>
              
                </div>
                <div>
                    <div className='cont_opc_pag_pricn'>
                      <Contenedor_opciones className='Contenedor_opciones' />
                    </div>
                    {productos.length > 0 ? (
                        <Contenedor_productos productos={productos} />
                    ) : (
                        <p>No hay productos disponibles actualmente.</p>
                    )}
                </div>
             
            </main>
        </Layout1>
    </div>
);

export default Pag_principal;