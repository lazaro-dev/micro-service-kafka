<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Banner extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    protected $increment = false;

    protected $fillable = [
        'title',
        'observation'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(fn ($model) => ($model->id) ?: ($model->id = Str::uuid()));
    }
}
