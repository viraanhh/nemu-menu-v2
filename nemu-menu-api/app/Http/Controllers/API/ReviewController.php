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
            ->with('user:id,username,user_profile_new')
            ->orderBy('created_at', 'desc') // Order by newest first
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
            'judul' => 'required|string|max:200',
            'menu' => 'required|string|max:255',
            'deskripsi_review' => 'required|string', // New field validation
            'tanggal_pergi' => 'required|date',
            'harga_per_orang' => 'required|string|max:50',
            'rasa_makanan' => 'required|integer|min:1|max:5',
            'suasana' => 'required|integer|min:1|max:5',
            'harga_dibandingkan_rasa' => 'required|integer|min:1|max:5',
            'pelayanan' => 'required|integer|min:1|max:5',
            'kebersihan' => 'required|integer|min:1|max:5',
            'photo_1_new' => 'nullable|string|url|max:500',
            'photo_2_new' => 'nullable|string|url|max:500',
            'photo_3_new' => 'nullable|string|url|max:500',
            'photo_4_new' => 'nullable|string|url|max:500',
            'photo_5_new' => 'nullable|string|url|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review = new Review();
        $review->restaurant_id = $restaurantId;
        $review->user_id = $request->user()->id;

        // Fill all fields including the new description
        $review->fill($request->except(['restaurant_id', 'user_id']));

        $review->save();

        // Load user relationship for response
        $review->load('user:id,username,user_profile_new');

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $restaurantId, string $reviewId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $review = Review::where('restaurant_id', $restaurantId)
            ->where('id', $reviewId)
            ->with('user:id,username,user_profile_new')
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        return response()->json($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $restaurantId, string $reviewId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $review = Review::where('restaurant_id', $restaurantId)
            ->where('id', $reviewId)
            ->where('user_id', $request->user()->id) // Only allow user to update their own review
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found or unauthorized'], 404);
        }

        $validator = Validator::make($request->all(), [
            'judul' => 'sometimes|required|string|max:200',
            'menu' => 'sometimes|required|string|max:255',
            'deskripsi_review' => 'sometimes|required|string',
            'tanggal_pergi' => 'sometimes|required|date',
            'harga_per_orang' => 'sometimes|required|string|max:50',
            'rasa_makanan' => 'sometimes|required|integer|min:1|max:5',
            'suasana' => 'sometimes|required|integer|min:1|max:5',
            'harga_dibandingkan_rasa' => 'sometimes|required|integer|min:1|max:5',
            'pelayanan' => 'sometimes|required|integer|min:1|max:5',
            'kebersihan' => 'sometimes|required|integer|min:1|max:5',
            'photo_1_new' => 'nullable|string|url|max:500',
            'photo_2_new' => 'nullable|string|url|max:500',
            'photo_3_new' => 'nullable|string|url|max:500',
            'photo_4_new' => 'nullable|string|url|max:500',
            'photo_5_new' => 'nullable|string|url|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review->fill($request->all());
        $review->save();

        $review->load('user:id,username,user_profile_new');

        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $restaurantId, string $reviewId, Request $request)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $review = Review::where('restaurant_id', $restaurantId)
            ->where('id', $reviewId)
            ->where('user_id', $request->user()->id) // Only allow user to delete their own review
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found or unauthorized'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
