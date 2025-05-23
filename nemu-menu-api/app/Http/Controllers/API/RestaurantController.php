<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Order by updated_at descending to get most recently updated first
            $restaurants = Restaurant::orderBy('updated_at', 'desc')->get();
            return response()->json($restaurants);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching restaurants',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'hari_buka_awal' => 'required|string|max:20',
            'hari_buka_akhir' => 'required|string|max:20',
            'jam_buka' => 'required|string|max:10',
            'jam_tutup' => 'required|string|max:10',
            'nomor_telepon' => 'required|string|max:20',
            'range_harga' => 'required|string|max:50',
            'restaurant_image_new' => 'nullable|string|url',
            'menu_1_new' => 'nullable|string|url',
            'menu_2_new' => 'nullable|string|url',
            'menu_3_new' => 'nullable|string|url',
            'menu_4_new' => 'nullable|string|url',
            'menu_5_new' => 'nullable|string|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Use DB transaction for Oracle
            $restaurant = DB::transaction(function () use ($request) {
                // Sanitize and prepare data
                $data = $this->sanitizeData($request->all());

                $restaurant = new Restaurant();
                $restaurant->fill($data);
                $restaurant->save();

                return $restaurant;
            });

            // Return restaurant with timestamps
            return response()->json([
                'message' => 'Restaurant created successfully',
                'restaurant' => $restaurant->fresh()
            ], 201);
        } catch (Exception $e) {
            Log::error('Restaurant creation error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Error creating restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $restaurant = Restaurant::find($id);

            if (!$restaurant) {
                return response()->json(['message' => 'Restaurant not found'], 404);
            }

            return response()->json($restaurant);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $restaurant = Restaurant::find($id);

            if (!$restaurant) {
                return response()->json(['message' => 'Restaurant not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'nama' => 'nullable|string|max:255',
                'alamat' => 'nullable|string|max:500',
                'hari_buka_awal' => 'nullable|string|max:20',
                'hari_buka_akhir' => 'nullable|string|max:20',
                'jam_buka' => 'nullable|string|max:10',
                'jam_tutup' => 'nullable|string|max:10',
                'nomor_telepon' => 'nullable|string|max:20',
                'range_harga' => 'nullable|string|max:50',
                'restaurant_image_new' => 'nullable|string|url',
                'menu_1_new' => 'nullable|string|url',
                'menu_2_new' => 'nullable|string|url',
                'menu_3_new' => 'nullable|string|url',
                'menu_4_new' => 'nullable|string|url',
                'menu_5_new' => 'nullable|string|url',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Use DB transaction
            $restaurant = DB::transaction(function () use ($request, $restaurant) {
                // Sanitize and prepare data
                $data = $this->sanitizeData($request->all());

                $restaurant->fill($data);
                $restaurant->save();

                return $restaurant;
            });

            return response()->json([
                'message' => 'Restaurant updated successfully',
                'restaurant' => $restaurant->fresh()
            ]);
        } catch (Exception $e) {
            Log::error('Restaurant update error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Error updating restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $restaurant = Restaurant::find($id);

            if (!$restaurant) {
                return response()->json(['message' => 'Restaurant not found'], 404);
            }

            // Check if there are related reviews that would prevent deletion
            if ($restaurant->reviews()->count() > 0) {
                return response()->json([
                    'message' => 'Cannot delete restaurant with existing reviews'
                ], 400);
            }

            $restaurant->delete();

            return response()->json([
                'message' => 'Restaurant deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error deleting restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sanitize data for Oracle database
     */
    private function sanitizeData(array $data)
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Trim whitespace
                $value = trim($value);

                // Handle empty strings (Oracle treats empty strings as NULL)
                $value = $value === '' ? null : $value;

                // Escape special characters if needed
                $sanitized[$key] = $value;
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }
}
