<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $table = 'history';
    protected $primaryKey = 'history_id';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'customer_id', 'user_id', 'date', 'time', 'noted', 'createdBy'
    ];

    public function details()
    {
        return $this->hasMany(HistoryDetail::class, 'history_id', 'history_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class, 'history_id', 'history_id');
    }
}