<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function getUserProfile($userId)
    {
        $user = User::find($userId);

        if (!$user || !$user->user_profile) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response($user->user_profile)
            ->header('Content-Type', 'image/jpeg');
    }

    public function getRestaurantImage($restaurantId)
    {
        $restaurant = Restaurant::find($restaurantId);

        if (!$restaurant || !$restaurant->restaurant_image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response($restaurant->restaurant_image)
            ->header('Content-Type', 'image/jpeg');
    }

    public function getRestaurantMenu($restaurantId, $menuNumber)
    {
        if (!in_array($menuNumber, [1, 2, 3, 4, 5])) {
            return response()->json(['message' => 'Invalid menu number'], 400);
        }

        $restaurant = Restaurant::find($restaurantId);
        $fieldName = "menu_{$menuNumber}";

        if (!$restaurant || !$restaurant->$fieldName) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response($restaurant->$fieldName)
            ->header('Content-Type', 'image/jpeg');
    }

    public function getReviewPhoto($reviewId, $photoNumber)
    {
        if (!in_array($photoNumber, [1, 2, 3, 4, 5])) {
            return response()->json(['message' => 'Invalid photo number'], 400);
        }

        $review = Review::find($reviewId);
        $fieldName = "photo_{$photoNumber}";

        if (!$review || !$review->$fieldName) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response($review->$fieldName)
            ->header('Content-Type', 'image/jpeg');
    }
}
