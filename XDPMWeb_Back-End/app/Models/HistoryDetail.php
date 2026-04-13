<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryDetail extends Model
{
    protected $table = 'history_detail';
    protected $primaryKey = 'history_detail_id';
    public $timestamps = false;

    protected $fillable = [
        'service_id', 'history_id', 'price', 'quantity'
    ];

    public function history()
    {
        return $this->belongsTo(History::class, 'history_id', 'history_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}