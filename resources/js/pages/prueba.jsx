































const GestorPedidos = ({ pedidos, totalPedidos, filters, currentPage, lastPage }) => {
    const [filtersState, setFilters] = useState(filters);
    const [pedidosState, setPedidos] = useState(pedidos);
    const [page, setPage] = useState(currentPage);
  
    const pedidosPorPagina = 5;  // Número de pedidos por página
  
    // Función para aplicar filtros
    const applyFilters = (e) => {
      e.preventDefault(); // Previene la recarga de la página
      const nonEmptyFilters = {};
      for (const [key, value] of Object.entries(filtersState)) {
        if (value !== '') {
          nonEmptyFilters[key] = value;
        }
      }
      // Recargar los pedidos con los filtros actuales
      Inertia.get(route('gestor.pedidos.filtrar'), {
        ...nonEmptyFilters,
        page: 1, // Reseteamos a la primera página al aplicar los filtros
      }, {
        onSuccess: (response) => {
          setPedidos(response.props.pedidos.data);
          setPage(1); // Reiniciar a la primera página
        },
      });
    };
  
    // Función para cambiar de página
    const loadPedidos = (newPage) => {
      setPage(newPage);
      Inertia.get(route('gestor.pedidos.filtrar'), {
        ...filtersState,  // Mantener los filtros
        page: newPage,
      }, {
        onSuccess: (response) => {
          setPedidos(response.props.pedidos.data);
        }
      });
    };
  
    // Función para manejar el cambio de filtros
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filtersState, [name]: value });
    };
  
     /////////    TOOGLESSSSS   ////////////

  // Función para toggle de estado 'pagado'
  const handleTogglePagado = async (pedidoId, event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/pedido/${pedidoId}/toggle-pagado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPedidos((prevState) =>
          prevState.map((pedido) =>
            pedido.id === pedidoId ? data.pedido : pedido
          )
        );
      } else {
        console.error('Error al actualizar el estado de pagado');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  // Función para toggle de estado 'entregado'
  const handleToggleEntregado = async (pedidoId, event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/pedido/${pedidoId}/toggle-entregado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPedidos((prevState) =>
          prevState.map((pedido) =>
            pedido.id === pedidoId ? data.pedido : pedido
          )
        );
      } else {
        console.error('Error al actualizar el estado de entregado');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  ////////  FIN   TOOGLESSSSS    ////////////

  
    return (
      <Layout1>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Gestor de Pedidos</h1>
          <div className="flex justify-center my-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-red-500">
              Total de Pedidos: {totalPedidos}
            </h2>
          </div>
  
          {/* Filtro de pedidos */}
          <FiltroPedidos filters={filtersState} onChange={handleFilterChange} onApply={applyFilters} />
  
          {/* Lista de pedidos */}
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
  
          {/* Paginación */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => loadPedidos(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-gray-800">
              Página {page} de {lastPage}
            </span>
            <button
              onClick={() => loadPedidos(page + 1)}
              disabled={page >= lastPage}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </Layout1>
    );
  };
  
  export default GestorPedidos;