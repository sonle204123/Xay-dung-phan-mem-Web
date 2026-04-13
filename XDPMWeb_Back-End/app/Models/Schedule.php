<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'schedule';
    protected $primaryKey = 'schedule_id';
    
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 'schedule_time_id', 'date', 'status', 'createdBy'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function scheduleTime()
    {
        return $this->belongsTo(ScheduleTime::class, 'schedule_time_id', 'schedule_time_id');
    }
}