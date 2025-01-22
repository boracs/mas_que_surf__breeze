import React, { useState, } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import '../../css/menu_principal.css'; 
import Dropdown from '@/Components/Dropdown';
import '../../css/menu_login.css';
import { useCartContext } from '../../js/Contexts/cartContext'; //  importo y uso  el Contexto ennel menu principal
// Iconos del carrito
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Icono del carrito







const Menu_Principal = () => {


    // obtengo los datos del carrito usando el usercarContext
    const { cartCount } = useCartContext(); // Aquí usas el contexto para obtener el número de productos en el carrito
    //obtengo la info delo usuario
    const { auth,} = usePage().props; // Accedemos al usuario y cantidadCarrito
    const user = auth?.user; // Verificando si el usuario está autenticado
    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú hamburguesa

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alternar el estado del menú
    };
    console.log(cartCount);
    return (
        <div>
            <nav className="bg-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                    {/* Icono hamburguesa para móviles */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden flex flex-col items-center space-y-2" // Cambié la disposición a columna
                    >
                        <span className={`block w-6 h-1 bg-gray-800 transform transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                        <span className={`block w-6 h-1 bg-gray-800 my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
                        <span className={`block w-6 h-1 bg-gray-800 transform transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                    </button>

                    {/* Menú para desktop */}
                    <div className="hidden lg:flex space-x-6">
                        <Link href={route('Pag_principal')} className="hover:text-red-500">Inicio</Link>
                        <Link href={route('nosotros')} className="hover:text-red-500">Nosotros</Link>
                        <Link href={route('tienda')} className="hover:text-red-500">Tienda</Link>
                        <Link href={route('contacto')} className="hover:text-red-500">Contacto</Link>

                        {user && (
                            <Link href={route('carrito')} className="flex items-center hover:text-red-500">
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Carrito
                                {cartCount > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                      {cartCount }
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>

                    {/* Parte de la cuenta o login (Visible tanto en móvil como en desktop) */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name || 'Mi cuenta'}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Cerrar sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <div className="menu-login flex space-x-4">
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menú desplegable en dispositivos móviles */}
                <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} mt-4 space-y-4`}>
                    <Link href={route('Pag_principal')} className="block text-gray-700 hover:text-red-500">Inicio</Link>
                    <Link href={route('nosotros')} className="block text-gray-700 hover:text-red-500">Nosotros</Link>
                    <Link href={route('tienda')} className="block text-gray-700 hover:text-red-500">Tienda</Link>
                    <Link href={route('contacto')} className="block text-gray-700 hover:text-red-500">Contacto</Link>

                    {user && (
                        <Link href={route('carrito')} className="flex items-center text-gray-700 hover:text-red-500">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Carrito
                            {cartCount  > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                   {cartCount }
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Mostrar login en dispositivos móviles también */}
                    {!user && (
                        <div className="menu-login flex space-x-4">
                            <Link
                                href={route('login')}
                                className="block text-gray-700 hover:text-red-500"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="block text-gray-700 hover:text-red-500"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Menu_Principal;
