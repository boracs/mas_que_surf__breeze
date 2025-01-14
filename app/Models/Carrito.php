<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array<string>
     */
    protected $fillable = [
        'id_usuario',
        'id_producto',
        'cantidad',
    ];

    /**
     * Relación con la tabla de usuarios (un carrito pertenece a un usuario).
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    /**
     * Relación con la tabla de productos (un carrito puede contener muchos productos).
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }
}
