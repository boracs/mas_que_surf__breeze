import React from 'react';
import Menu_principal from '../components/Menu_login';
import Titulo from '../components/Titulo';
import Footer from '../components/Footer';


const Layout1_login = ({ children }) => (
    <div className='layout_1'>
        <Titulo/>
        <Menu_login/>
        <main>{children}</main>{/* Aquí se renderizará el contenido principal de cada página */}
        <Footer />
    </div>
);

export default Layout1_login;