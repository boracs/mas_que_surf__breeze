import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { HiCheckCircle, HiXCircle, HiFilter } from 'react-icons/hi';
import { Link } from "@inertiajs/react";
import Layout1 from '../layouts/Layout1';

// Componente para el filtro
const FiltroPedidos = ({ filters, onChange, onApply }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      <div className="flex items-center gap-3">
        <HiFilter className="text-xl text-gray-500" />
        <label className="text-sm font-medium text-gray-700">Pagado:</label>
        <select
          name="pagado"
          value={filters.pagado}
          onChange={onChange}
          className="border rounded-md text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos</option>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Entregado:</label>
        <select
          name="entregado"
          value={filters.entregado}
          onChange={onChange}
          className="border rounded-md text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos</option>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

// Componente para cada pedido
const PedidoItem = ({ pedido, onTogglePagado, onToggleEntregado }) => (
  <div className="border p-6 mb-6 rounded-lg shadow-lg hover:shadow-xl transition-all bg-white">
    <div className="flex justify-between items-center mb-4">
      <p className="font-medium text-xl text-gray-800">ID Pedido: {pedido.id}</p>
      <div className="flex gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${pedido.pagado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {pedido.pagado ? <HiCheckCircle className="mr-1" /> : <HiXCircle className="mr-1" />}
          {pedido.pagado ? 'Pagado' : 'No Pagado'}
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${pedido.entregado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {pedido.entregado ? <HiCheckCircle className="mr-1" /> : <HiXCircle className="mr-1" />}
          {pedido.entregado ? 'Entregado' : 'No Entregado'}
        </span>
      </div>
    </div>

    <div className="flex justify-between mb-4">
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">Total: ${pedido.precio_total}</p>
        <p className="text-sm text-gray-600">Fecha: {new Date(pedido.created_at).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col text-right">
        <p className="text-sm text-gray-700">{pedido.usuario.nombre} {pedido.usuario.apellido}</p>
        <p className="text-sm text-gray-700">{pedido.usuario.telefono}</p>
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Pagado:</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={pedido.pagado}
            onChange={(event) => onTogglePagado(pedido.id, event)} // Pasa el event aquí
            className="hidden"
          />
          <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${pedido.pagado ? 'bg-green-500' : 'bg-red-500'}`}>
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${pedido.pagado ? 'translate-x-4' : 'translate-x-0'}`}
            ></div>
          </div>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Entregado:</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={pedido.entregado}
            onChange={(event) => onToggleEntregado(pedido.id, event)} // Pasa el event aquí
            className="hidden"
          />
          <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${pedido.entregado ? 'bg-green-500' : 'bg-red-500'}`}>
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${pedido.entregado ? 'translate-x-4' : 'translate-x-0'}`}
            ></div>
          </div>
        </label>
      </div>

      <Link 
        href={`/mostrar-pedido/${pedido.id}`} 
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        Ver Detalle
      </Link>
    </div>
  </div>
);

// Componente principal GestorPedidos
const GestorPedidos = ({ pedidos }) => {
  const [filters, setFilters] = useState({
    pagado: '',
    entregado: '',
  });

  const [pedidosState, setPedidos] = useState(pedidos);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    const nonEmptyFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== '') {
        nonEmptyFilters[key] = value;
      }
    }

    Inertia.get(route('gestor.pedidos.filtrar'), nonEmptyFilters, {
      onSuccess: (response) => {
        setPedidos(response.props.pedidos.data);
      },
    });
  };

  const handleTogglePagado = (pedidoId, event) => {
    event.preventDefault(); // Asegura que la página no se recargue
    Inertia.patch(`/pedido/${pedidoId}/toggle-pagado`, {}, {
      onSuccess: () => {
        setPedidos((prevState) =>
          prevState.map((pedido) =>
            pedido.id === pedidoId ? { ...pedido, pagado: !pedido.pagado } : pedido
          )
        );
      },
    });
  };

  const handleToggleEntregado = (pedidoId, event) => {
    event.preventDefault(); // Asegura que la página no se recargue
    Inertia.patch(`/pedido/${pedidoId}/toggle-entregado`, {}, {
      onSuccess: () => {
        setPedidos((prevState) =>
          prevState.map((pedido) =>
            pedido.id === pedidoId ? { ...pedido, entregado: !pedido.entregado } : pedido
          )
        );
      },
    });
  };

  return (
    <Layout1>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Gestor de Pedidos</h1>

          <FiltroPedidos filters={filters} onChange={handleFilterChange} onApply={applyFilters} />

          <div className="pedido-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidosState && pedidosState.length > 0 ? (
              pedidosState.map((pedido) => (
                <PedidoItem
                  key={pedido.id}
                  pedido={pedido}
                  onTogglePagado={handleTogglePagado}
                  onToggleEntregado={handleToggleEntregado}
                />
              ))
            ) : (
              <p className="text-gray-600 mt-4 col-span-3 text-center">No hay pedidos disponibles.</p>
            )}
          </div>
        </div>
    </Layout1>
  );
};

export default GestorPedidos;