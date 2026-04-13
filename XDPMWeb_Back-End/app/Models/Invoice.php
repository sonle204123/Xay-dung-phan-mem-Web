<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoice';
    protected $primaryKey = 'invoice_id';

    const CREATED_AT = 'createdAt'; // Khớp với ERD
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 'history_id', 'total_price', 'method_payment', 'status'
    ];

    public function history()
    {
        return $this->belongsTo(History::class, 'history_id', 'history_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}