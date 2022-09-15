<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessBanner;
use App\Models\Banner;
use App\Models\User;
use Illuminate\Http\Request;

class GenerateBannerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = User::first();

        $banner = Banner::create([
            'title' => "Aposte Agora",
            'observation' => "Faça sua aposta aqui..."
        ]);

        ProcessBanner::dispatch([
            'user' => $user,
            'banner' => $banner
        ])->onConnection('rabbitmq');

        return response()->noContent();
    }
}
