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
            'photo_1_new' => 'nullable|string|url', // Now accepts URL string
            'photo_2_new' => 'nullable|string|url',
            'photo_3_new' => 'nullable|string|url',
            'photo_4_new' => 'nullable|string|url',
            'photo_5_new' => 'nullable|string|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review = new Review();
        $review->restaurant_id = $restaurantId;
        $review->user_id = $request->user()->id;

        // Fill all fields including photo URLs
        $review->fill($request->except(['restaurant_id', 'user_id']));

        $review->save();

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review
        ], 201);
    }
}
