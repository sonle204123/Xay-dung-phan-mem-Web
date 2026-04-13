<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentDetail extends Model
{
    protected $table = 'appointment_detail';
    protected $primaryKey = 'appointment_detail_id';
    public $timestamps = false;

    protected $fillable = [
        'appointment_id', 'service_id'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'appointment_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}