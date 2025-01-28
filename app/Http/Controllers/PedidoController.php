<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
class PedidoController extends Controller
{



    public function crear(Request $request)
    {
        $productosCarrito = $request->input('productos'); // Asumiendo que los productos vienen en el request
        $user = auth()->user(); // Obtener al usuario autenticado
        $totalCarrito = 0;
        
        // Si tienes un campo de fecha (como 'fecha_entrega'), asegurémonos de que esté en el formato adecuado
        $fechaEntrega = $request->input('fecha_entrega') 
            ? Carbon::createFromFormat('d/m/Y', $request->input('fecha_entrega'))->format('Y-m-d') 
            : null; // O null si no se proporciona la fecha
    
        // Crear el pedido primero
        $pedido = Pedido::create([
            'id_usuario' => $user->id,
            'precio_total' => 0, // Establece el precio total inicialmente como 0
            'pagado' => false,
            'entregado' => false,
            'fecha_entrega' => $fechaEntrega, // Asegúrate de incluir la fecha aquí si corresponde
        ]);
        
        // Iterar sobre los productos del carrito y calcular el precio total
        foreach ($productosCarrito as $producto) {
            $prod = Producto::find($producto['id']);
            if ($prod) {
                // Calcular el precio con descuento
                $precioConDescuento = $prod->precio - ($prod->precio * ($prod->descuento / 100));
                $subtotal = $precioConDescuento * $producto['cantidad'];
                $totalCarrito += $subtotal;
        
                // Insertar productos en la tabla pedido_producto, incluyendo descuento y precio pagado
                $pedido->productos()->attach($prod->id, [
                    'cantidad' => $producto['cantidad'],
                    'descuento_aplicado' => $prod->descuento,  // Descuento aplicado
                    'precio_pagado' => $precioConDescuento,     // Precio con descuento
                ]);
            }
        }
    
        // Eliminar los productos del carrito (si tienes una tabla de carrito asociada)
        $user->carrito()->delete(); // Esto eliminaría todos los productos del carrito del usuario
    
        // Actualizar el precio total del pedido
        $pedido->update([
            'precio_total' => $totalCarrito,
        ]);
        
        // Redirigir al usuario a la página de detalles del pedido
        return redirect()->route('mostrar.pedido', ['id_pedido' => $pedido->id]);
    }



    public function mostrarPedido($id_pedido)
        {
          
            // Obtener el pedido por su ID, lanzando una excepción si no se encuentra
            $pedido = Pedido::findOrFail($id_pedido);

            // Obtener los productos del pedido
            $productos = $pedido->productos; // Relación 'productos' ya definida en el modelo Pedido

            // Cálculo del total con los descuentos aplicados
            $totalConDescuento = 0;
            foreach ($productos as $producto) {
                // Calcular el precio con descuento
                $precioConDescuento = $producto->precio - ($producto->precio * ($producto->descuento / 100));
                // Acumulamos el subtotal considerando la cantidad del producto
                $totalConDescuento += $precioConDescuento * $producto->pivot->cantidad;
            }

          
            // Retornar la vista con los datos del pedido y los productos
            return Inertia::render('Pedido', [
                'pedido' => $pedido,
                'productos' => $productos,
                'totalConDescuento' => $totalConDescuento,
            ]);
        }



        //muestar todos los pedidso teniendo enceunta la tabla piuvote es un poco enrevesado
        public function mostrarPedidos()
        {
            $user_id = auth()->id();
            
            // Obtener los pedidos con sus productos y los datos de la tabla pivote
            $pedidos = Pedido::where('id_usuario', $user_id)
                ->with(['productos' => function ($query) {
                    $query->select('productos.id', 'nombre', 'precio') // Campos de productos
                        ->withPivot('cantidad', 'descuento_aplicado', 'precio_pagado'); // Campos de la pivote
                }])
                ->get();
            
            // Transformar los datos para incluir los timestamps
            return Inertia::render('Pedidos', [
                'pedidos' => $pedidos->map(function ($pedido) {
                    return [
                        'id' => $pedido->id,
                        'precio_total' => $pedido->precio_total,
                        'pagado' => $pedido->pagado,
                        'entregado' => $pedido->entregado,
                        'created_at' => $pedido->created_at->toIso8601String(),  // Aseguramos que el formato sea correcto
                        'productos' => $pedido->productos->map(function ($producto) {
                            return [
                                'id' => $producto->id,
                                'nombre' => $producto->nombre,
                                'precio' => $producto->precio,
                                'cantidad' => $producto->pivot->cantidad,
                                'descuento_aplicado' => $producto->pivot->descuento_aplicado,
                                'precio_pagado' => $producto->pivot->precio_pagado,
                            ];
                        }),
                    ];
                }),
            ]);
        }

//---------------------------------------------------------------------------------------------///////////////////////////////////////////////


    //muestra todos lso pedidso en el gestor de pedidso 
    public function index()
    {
        // Obtener todos los pedidos sin filtrar por id de usuario
        $pedidos = Pedido::with(['productos' => function ($query) {
            $query->select('productos.id', 'nombre', 'precio')
                ->withPivot('cantidad', 'descuento_aplicado', 'precio_pagado');
        }, 'usuario'])  // Incluimos la relación 'usuario'
        ->get();
        
        // Verifica si realmente hay pedidos
        if ($pedidos->isEmpty()) {
            Log::info("No se encontraron pedidos.");
        }
    
        return Inertia::render('GestorPedidos', [
            'pedidos' => [
                'data' => $pedidos->map(function ($pedido) {
                    return [
                        'id' => $pedido->id,
                        'precio_total' => $pedido->precio_total,
                        'pagado' => $pedido->pagado,
                        'entregado' => $pedido->entregado,
                        'created_at' => $pedido->created_at->toIso8601String(),
                        'usuario' => [
                            'nombre' => $pedido->usuario->nombre,
                            'apellido' => $pedido->usuario->apellido,
                            'telefono' => $pedido->usuario->telefono,
                        ],
                        'productos' => $pedido->productos->map(function ($producto) {
                            return [
                                'id' => $producto->id,
                                'nombre' => $producto->nombre,
                                'precio' => $producto->precio,
                                'cantidad' => $producto->pivot->cantidad,
                                'descuento_aplicado' => $producto->pivot->descuento_aplicado,
                                'precio_pagado' => $producto->pivot->precio_pagado,
                            ];
                        }),
                    ];
                })
            ],
        ]);
    }



    public function update(Request $request, Pedido $pedido)
    {
        // Actualizar el estado del pedido
        $pedido->update($request->only(['pagado', 'entregado']));

        // Redirigir de vuelta con los pedidos actualizados
        return redirect()->route('gestor.pedidos');
    }





    // realiza una busqueda con lso filstors que l he puesot y me  devuelve lso datos y actualiza los compnentes necesarios
    public function applyFilter(Request $request)
    {
        // Recoger los filtros enviados desde el frontend
        $pagado = $request->input('pagado'); // Puede ser '1', '0', o ''
        $entregado = $request->input('entregado'); // Puede ser '1', '0', o ''
        $usuarioNombre = $request->input('usuarioNombre'); // Filtro adicional de nombre de usuario (si se aplica)
        
        // Filtrar los pedidos según los valores
        $pedidos = Pedido::with(['usuario']) // Cargar la relación 'usuario'
            ->when($pagado !== '', function ($query) use ($pagado) {
                if ($pagado === '1') {
                    $query->where('pagado', true); // Filtrar por 'sí'
                } elseif ($pagado === '0') {
                    $query->where('pagado', false); // Filtrar por 'no'
                }
            })
            ->when($entregado !== '', function ($query) use ($entregado) {
                if ($entregado === '1') {
                    $query->where('entregado', true); // Filtrar por 'sí'
                } elseif ($entregado === '0') {
                    $query->where('entregado', false); // Filtrar por 'no'
                }
            })
            // Filtro adicional para el nombre del usuario si es necesario
            ->when(!empty($usuarioNombre), function ($query) use ($usuarioNombre) {
                $query->whereHas('usuario', function ($q) use ($usuarioNombre) {
                    $q->where('nombre', 'like', "%{$usuarioNombre}%"); // Filtro para el nombre del usuario
                });
            })
            ->paginate(50); // Paginación de los resultados
        
        // Retornar los pedidos filtrados junto con los datos del usuario y productos
        return Inertia::render('GestorPedidos', [
            'pedidos' => $pedidos->map(function ($pedido) {
                return [
                    'id' => $pedido->id,
                    'precio_total' => $pedido->precio_total,
                    'pagado' => $pedido->pagado,
                    'entregado' => $pedido->entregado,
                    'created_at' => $pedido->created_at->toIso8601String(),
                    'usuario' => [
                        'nombre' => $pedido->usuario->nombre,
                        'apellido' => $pedido->usuario->apellido,
                        'telefono' => $pedido->usuario->telefono,
                    ],
                    'productos' => $pedido->productos->map(function ($producto) {
                        return [
                            'id' => $producto->id,
                            'nombre' => $producto->nombre,
                            'precio' => $producto->precio,
                            'cantidad' => $producto->pivot->cantidad,
                            'descuento_aplicado' => $producto->pivot->descuento_aplicado,
                            'precio_pagado' => $producto->pivot->precio_pagado,
                        ];
                    }),
                ];
            }),
        ]);
    }






   // Método para alternar el estado de "pagado"
/* public function togglePagado($id)
{
    $pedido = Pedido::findOrFail($id);
    $pedido->pagado = !$pedido->pagado;
    $pedido->save();

    // Redirigir a la misma página sin renderizar toda la vista
    return Inertia::location(route('gestor.pedidos'));
}

public function toggleEntregado($id)
{
    $pedido = Pedido::findOrFail($id);
    $pedido->entregado = !$pedido->entregado;
    $pedido->save();

    // Redirigir a la misma página sin renderizar toda la vista
    return Inertia::location(route('gestor.pedidos'));
}

 */
// esto em da error tthis.resolve componetne is not a function 
 public function togglePagado($id)
 {
     $pedido = Pedido::findOrFail($id);
     $pedido->pagado = !$pedido->pagado;
     $pedido->save();
 
     // Responder con los datos actualizados sin redirigir
     return Inertia::render('GestorPedidos', [
         'pedidos' => Pedido::all(),
     ]);
 }
 
 public function toggleEntregado($id)
 {
     $pedido = Pedido::findOrFail($id);
     $pedido->entregado = !$pedido->entregado;
     $pedido->save();
 
     // Responder con los datos actualizados sin redirigir
     return Inertia::render('GestorPedidos', [
         'pedidos' => Pedido::all(),
     ]);
 }





}

















   




    
















