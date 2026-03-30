<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'category_id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description'
    ];

    public function services()
    {
        return $this->hasMany(Service::class, 'category_id', 'category_id');
    }
}