<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';
    protected $primaryKey = 'customer_id';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null; // Tắt updated_at mặc định của Laravel

    protected $fillable = [
        'fullname', 'date_of_birth', 'gender', 
        'contact_number', 'address', 'createdBy'
    ];

    public function histories()
    {
        return $this->hasMany(History::class, 'customer_id', 'customer_id');
    }
}