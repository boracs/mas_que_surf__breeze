<?php

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\Pag_principalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas de autenticación
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);


//PAGINA PRINCIPAL
Route::get('/', [Pag_principalController::class, 'index'])->name('Pag_principal');


//rutas provisonales para evitar errores 
Route::get('/nosotros', function () {return 'Nosotros';})->name('nosotros');
Route::get('/tienda', function () {return 'Tienda';})->name('tienda');
Route::get('/contacto', function () {return 'Contacto';})->name('contacto');



// rutas del carrito de compra 
Route::middleware(['auth'])->group(function () {
    
    //CARRITO
    // Ruta para agregar productos al carrito
    Route::post('/carrito/agregar/{productoId}', [CarritoController::class, 'agregarAlCarrito'])->name('carrito.agregar');
    // Ruta para ver el carrito
    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito');
    // Ruta para eliminar productos del carrito
    Route::delete('/carrito/eliminar/{productoId}', [CarritoController::class, 'eliminarProducto'])->name('carrito.eliminar');
    Route::get('/producto-eliminado-carrito/{nombreProducto}', function ($nombreProducto) { return Inertia::render('ProductoEliminado', ['nombreProducto' => $nombreProducto]); })->name('producto.eliminado.carrito');
    

    //PEDIDOS
    Route::post('/crear-pedido', [PedidoController::class, 'crear'])->name('crear.pedido');
    Route::get('/mostrar-pedido/{id_pedido}', [PedidoController::class, 'mostrarPedido'])->name('mostrar.pedido');



    
    //PRODUCTOS   // Rutas para el administrador para poder modificar productos
    Route::middleware('admin')->group(function () {
        Route::get('/productos', [ProductoController::class, 'mostrarProductos'])->name('mostrar.productos');
        Route::delete('/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');
        Route::get('/productos/{id}/edit', [ProductoController::class, 'edit'])->name('productos.edit');
        Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
    });

});


// Rutas de pedidos

require __DIR__.'/auth.php';
