<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Carrito;
use Inertia\Inertia;

class Pag_principalController extends Controller
{
    public function index()
    {
        // Obtener todos los productos
        $productos = Producto::all();
    
        // Obtener el usuario autenticado
        $user = auth()->user();
    
        if ($user) {
            // El usuario está autenticado
            $carrito = Carrito::where('id_usuario', $user->id)->first();
    
            // Comprobar si el carrito existe
            if ($carrito) {
                // Sumar las cantidades desde la tabla pivote
                $cantidadCarrito = $carrito->productos->sum(function ($producto) {
                    return $producto->pivot->cantidad;
                });
            } else {
                // Si no existe un carrito, asignamos 0
                $cantidadCarrito = 0;
            }
        } else {
            // El usuario no está autenticado
            $cantidadCarrito = 0;
        }
    
        // Pasar los productos, el usuario autenticado y la cantidad de productos en el carrito a la vista
        return Inertia::render('Pag_principal', [
            'productos' => $productos,
            'cantidadCarrito' => $cantidadCarrito, // Pasamos la cantidad al frontend
        ]);
    }
}