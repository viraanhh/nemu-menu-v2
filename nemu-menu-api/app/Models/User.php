<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'USER'; // Oracle table name
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'email',
        'username',
        'no_telepon',
        'nama_depan',
        'nama_belakang',
        'tanggal_lahir',
        'bulan_lahir',
        'tahun_lahir',
        'jenis_kelamin',
        'password',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];

    /**
     * Get the reviews posted by the user.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id', 'id');
    }

    /**
     * Generate a UUID for new users
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Let Oracle handle UUID generation through trigger
        });
    }
}
