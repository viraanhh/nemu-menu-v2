<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $table = 'RESTAURANT';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'nama',
        'alamat',
        'hari_buka_awal',
        'hari_buka_akhir',
        'jam_buka',
        'jam_tutup',
        'nomor_telepon',
        'range_harga',
        // Supabase image URLs
        'restaurant_image_new',
    ];

    /**
     * Get all reviews for the restaurant.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'restaurant_id', 'id');
    }
}
