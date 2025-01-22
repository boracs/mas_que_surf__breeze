<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        // Obtener los 4 productos con mayor descuento
        $productos = Producto::orderBy('descuento', 'desc')->take(4)->get();

        // Pasar los productos al componente de Inertia
        return Inertia::render('ContenedorProductos', [
            'productos' => $productos,
        ]);
    }


    public function mostrarProductos()
    {
        // Obtener todos los productos
        $productos = Producto::all(); // Aquí puedes aplicar filtros si lo deseas

        // Pasar los productos a Inertia
        return Inertia::render('Productos', [
            'productos' => $productos
        ]);
    }



    public function destroy($id)
    {
        $producto = Producto::findOrFail($id);
        $producto->delete();
    
        return redirect()->route('mostrar.productos');
    }
    




    public function edit($id)
    {
        $producto = Producto::findOrFail($id);
    
        // Puedes devolver el producto a un formulario de edición
        return Inertia::render('EditarProducto', [
            'producto' => $producto
        ]);
    }




    
    public function store(Request $request)
    {
        // Validación y creación de un nuevo producto
        $producto = Producto::create($request->all());
    
        return redirect()->route('mostrar.productos');
    }












}