<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'REVIEW';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'user_id',
        'restaurant_id',
        'judul',
        'menu',
        'tanggal_pergi',
        'harga_per_orang',
        'rasa_makanan',
        'suasana',
        'harga_dibandingkan_rasa',
        'pelayanan',
        'kebersihan',
        // Supabase image URLs
        'photo_1_new',
        'photo_2_new',
        'photo_3_new',
        'photo_4_new',
        'photo_5_new'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'tanggal_pergi' => 'datetime',
        'rasa_makanan' => 'integer',
        'suasana' => 'integer',
        'harga_dibandingkan_rasa' => 'integer',
        'pelayanan' => 'integer',
        'kebersihan' => 'integer',
    ];

    /**
     * Get the user that wrote the review.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get the restaurant that was reviewed.
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id', 'id');
    }
}
