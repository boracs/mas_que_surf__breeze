<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array<string>
     */
    protected $fillable = [
        'id_usuario',
        'precio_total',
        'pagado',
        'entregado',
    ];

    /**
     * Relación con la tabla de usuarios (un pedido pertenece a un usuario).
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    /**
     * Relación con la tabla de pedido_producto (un pedido puede contener muchos productos).
     */
    public function pedidoProductos()
    {
        return $this->hasMany(PedidoProducto::class, 'id_pedido');
    }
}