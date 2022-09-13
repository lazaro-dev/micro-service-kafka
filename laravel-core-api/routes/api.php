<?php

use App\Http\Controllers\GenerateBannerController;
use Illuminate\Support\Facades\Route;

Route::post('/generate-banner', GenerateBannerController::class);
