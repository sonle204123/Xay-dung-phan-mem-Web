<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointment';
    protected $primaryKey = 'appointment_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'fullname', 'contact_number', 
        'time', 'date', 'noted', 'status'
    ];

    public function details()
    {
        return $this->hasMany(AppointmentDetail::class, 'appointment_id', 'appointment_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}