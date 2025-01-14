import React from 'react';
import Menu_principal_login from '../components/Menu_login';
import Titulo from '../components/Titulo';
import Footer from '../components/Footer';
import Contenedor_opciones from '../layouts/Contenedor_opciones';
import '../../css/layout2_login_inicio.css';
import Contenedor_productos  from '../layouts/Contenedor_productos';


const Layout2_login_inicio = ({ children }) => (
    <div className='layout_1'>
        <Titulo/>
        <Menu_principal_login/>
        <div className='contenedor_del_contenedor_opciones'>
            < Contenedor_opciones className='Contenedor_opciones'></Contenedor_opciones>
       </div>
       <div className="titulo-descuentos">
            <h1>¡Mayores Descuentos!</h1>
        </div>
       <div>
      < Contenedor_productos></Contenedor_productos>
       </div>


        <Footer />
    </div>
);

export default Layout2_login_inicio;