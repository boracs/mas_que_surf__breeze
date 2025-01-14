<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nombre',
        'precio',
        'unidades',
    ];

    /**
     * Relación con la tabla de pedido_producto (un producto puede estar en muchos pedidos).
     */
    public function pedidoProductos()
    {
        return $this->hasMany(PedidoProducto::class, 'id_producto');
    }

    /**
     * Relación con la tabla de carrito (un producto puede estar en muchos carritos).
     */
    public function carrito()
    {
        return $this->hasMany(Carrito::class, 'id_producto');
    }
}