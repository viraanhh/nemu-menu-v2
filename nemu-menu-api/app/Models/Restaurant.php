<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Restaurant extends Model
{
    use HasFactory;

    protected $table = 'RESTAURANT';

    // Specify that the primary key is not auto-incrementing
    public $incrementing = false;

    // Specify the primary key type as string (for UUID)
    protected $keyType = 'string';

    // Specify the primary key column name
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama',
        'alamat',
        'hari_buka_awal',
        'hari_buka_akhir',
        'jam_buka',
        'jam_tutup',
        'nomor_telepon',
        'range_harga',
        'restaurant_image',
        'restaurant_image_new',
        'menu_1_new',
        'menu_2_new',
        'menu_3_new',
        'menu_4_new',
        'menu_5_new',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Automatically generate UUID when creating new records
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Override the save method to handle Oracle-specific issues
    public function save(array $options = [])
    {
        // Ensure all string fields are properly quoted/escaped
        foreach ($this->fillable as $field) {
            if (isset($this->attributes[$field]) && is_string($this->attributes[$field])) {
                // Trim whitespace and handle empty strings
                $value = trim($this->attributes[$field]);
                $this->attributes[$field] = $value === '' ? null : $value;
            }
        }

        return parent::save($options);
    }

    /**
     * Get the reviews for the restaurant.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'restaurant_id', 'id');
    }

    /**
     * Get the average rating for this restaurant
     */
    public function getAverageRatingAttribute()
    {
        $reviews = $this->reviews;

        if ($reviews->count() === 0) {
            return 0;
        }

        $totalRating = $reviews->sum(function ($review) {
            return ($review->rasa_makanan + $review->suasana +
                   $review->harga_dibandingkan_rasa + $review->pelayanan +
                   $review->kebersihan) / 5;
        });

        return round($totalRating / $reviews->count(), 1);
    }

    /**
     * Get the total number of reviews for this restaurant
     */
    public function getReviewCountAttribute()
    {
        return $this->reviews()->count();
    }

    // Add method to handle Oracle CLOB fields if needed
    // protected function asJson($value)
    // {
    //     return json_encode($value, JSON_UNESCAPED_UNICODE);
    // }
}
