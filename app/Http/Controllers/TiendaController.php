<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiendaController extends Controller
{
    // Muestra la página de la tienda con los productos
    public function index()
    {
        $productos = Producto::all(); // Obtiene todos los productos
        return Inertia::render('Tienda', [
            'productos' => $productos,
        ]);
    }

    // Agrega un producto al carrito
    public function agregarAlCarrito(Request $request)
    {
        $productoId = $request->input('producto_id');

        // Aquí puedes implementar tu lógica para agregar al carrito.
        // Por ejemplo, guardar en una tabla de carritos o en la sesión.

        return response()->json(['mensaje' => 'Producto añadido al carrito']);
    }
}