<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleTime extends Model
{
    protected $table = 'schedule_time';
    protected $primaryKey = 'schedule_time_id';
    public $timestamps = false;

    protected $fillable = [
        'start_time', 'end_time'
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'schedule_time_id', 'schedule_time_id');
    }
}