import React from 'react';
import Layout1 from '../layouts/Layout1_login';
import '../../css/inicio.css';
import Contenedor_productos from '../layouts/Contenedor_productos';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';


const Inicio_login = () => (
 <div>
    <Layout1>
      <Contenedor_productos/>
    </Layout1>
 </div>
);

export default Inicio_login;