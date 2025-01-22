<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function crear(Request $request)
{
    $productosCarrito = $request->input('productos'); // Asumiendo que los productos vienen en el request
    $user = auth()->user(); // Obtener al usuario autenticado
    $totalCarrito = 0;

    // Crear el pedido primero
    $pedido = Pedido::create([
        'id_usuario' => $user->id,
        'precio_total' => 0, // Establece el precio total inicialmente como 0
        'pagado' => false,
        'entregado' => false,
    ]);

    // Iterar sobre los productos del carrito y calcular el precio total
    foreach ($productosCarrito as $producto) {
        $prod = Producto::find($producto['id']);
        if ($prod) {
            // Calcular el precio con descuento
            $precioConDescuento = $prod->precio - ($prod->precio * ($prod->descuento / 100));
            $subtotal = $precioConDescuento * $producto['cantidad'];
            $totalCarrito += $subtotal;

            // Insertar productos en la tabla pedido_producto sin el campo 'precio'
            $pedido->productos()->attach($prod->id, [
                'cantidad' => $producto['cantidad'],
            ]);
        }
    }

    // Actualizar el precio total del pedido
    $pedido->update([
        'precio_total' => $totalCarrito,
    ]);

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
    return Inertia::render('Pedido/Mostrar', [
        'pedido' => $pedido,
        'productos' => $productos,
        'totalConDescuento' => $totalConDescuento,
    ]);
}

    
    
}
