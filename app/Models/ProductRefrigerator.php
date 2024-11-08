<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductRefrigerator extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'link-shopee', 'link-tokopedia', 'whatsapp', 'image'];
}
