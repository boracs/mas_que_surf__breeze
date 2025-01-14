import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Layout2_login_inicio from '../layouts/Layout2_login_inicio';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>

            <Layout2_login_inicio/>  

           
        </AuthenticatedLayout>
    );
}
