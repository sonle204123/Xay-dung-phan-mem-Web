<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'service';
    protected $primaryKey = 'service_id';
    public $timestamps = false;

    protected $fillable = [
        'category_id', 'image', 'name', 'description', 
        'min_price', 'max_price', 'unit', 'status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }
}