<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Review extends Model
{
    use HasFactory;

    protected $table = 'REVIEW';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    // Enable timestamps but customize the column names
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null; // We only have created_at in Oracle

    protected $fillable = [
        'id',
        'user_id',
        'restaurant_id',
        'judul',
        'menu',
        'deskripsi_review', // New field added
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
        'created_at' => 'datetime', // Cast the new timestamp
        'rasa_makanan' => 'integer',
        'suasana' => 'integer',
        'harga_dibandingkan_rasa' => 'integer',
        'pelayanan' => 'integer',
        'kebersihan' => 'integer',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
    ];

    /**
     * Boot method to auto-generate UUID for new records
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

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

    /**
     * Calculate average rating for this review
     */
    public function getAverageRatingAttribute()
    {
        return round((
            $this->rasa_makanan +
            $this->suasana +
            $this->harga_dibandingkan_rasa +
            $this->pelayanan +
            $this->kebersihan
        ) / 5, 1);
    }

    /**
     * Get all photo URLs as an array
     */
    public function getPhotosAttribute()
    {
        return array_filter([
            $this->photo_1_new,
            $this->photo_2_new,
            $this->photo_3_new,
            $this->photo_4_new,
            $this->photo_5_new,
        ]);
    }

    /**
     * Scope to get reviews for a specific restaurant
     */
    public function scopeForRestaurant($query, $restaurantId)
    {
        return $query->where('restaurant_id', $restaurantId);
    }

    /**
     * Scope to get reviews by a specific user
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to order by newest first
     */
    public function scopeNewest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope to order by highest rating first
     */
    public function scopeHighestRated($query)
    {
        return $query->orderByRaw('(rasa_makanan + suasana + harga_dibandingkan_rasa + pelayanan + kebersihan) DESC');
    }
}
