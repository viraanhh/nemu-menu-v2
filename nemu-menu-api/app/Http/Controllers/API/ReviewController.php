<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $restaurantId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $reviews = Review::where('restaurant_id', $restaurantId)
            ->with('user:id,username,user_profile')
            ->get();

        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $restaurantId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'judul' => 'required|string',
            'menu' => 'required|string',
            'tanggal_pergi' => 'required|date',
            'harga_per_orang' => 'required|string',
            'rasa_makanan' => 'required|integer|min:0|max:5',
            'suasana' => 'required|integer|min:0|max:5',
            'harga_dibandingkan_rasa' => 'required|integer|min:0|max:5',
            'pelayanan' => 'required|integer|min:0|max:5',
            'kebersihan' => 'required|integer|min:0|max:5',
            'photo_1' => 'nullable|image|max:2048',
            'photo_2' => 'nullable|image|max:2048',
            'photo_3' => 'nullable|image|max:2048',
            'photo_4' => 'nullable|image|max:2048',
            'photo_5' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review = new Review();
        $review->restaurant_id = $restaurantId;
        $review->user_id = $request->user()->id;
        $review->judul = $request->judul;
        $review->menu = $request->menu;
        $review->tanggal_pergi = $request->tanggal_pergi;
        $review->harga_per_orang = $request->harga_per_orang;
        $review->rasa_makanan = $request->rasa_makanan;
        $review->suasana = $request->suasana;
        $review->harga_dibandingkan_rasa = $request->harga_dibandingkan_rasa;
        $review->pelayanan = $request->pelayanan;
        $review->kebersihan = $request->kebersihan;

        // Handle photo uploads
        for ($i = 1; $i <= 5; $i++) {
            $field = "photo_{$i}";
            if ($request->hasFile($field)) {
                $imageData = file_get_contents($request->file($field)->path());
                $review->$field = $imageData;
            }
        }

        $review->save();

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review
        ], 201);
    }
}
