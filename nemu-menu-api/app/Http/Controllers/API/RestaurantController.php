<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json($restaurants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
            'alamat' => 'required|string',
            'hari_buka_awal' => 'required|string',
            'hari_buka_akhir' => 'required|string',
            'jam_buka' => 'required|string',
            'jam_tutup' => 'required|string',
            'nomor_telepon' => 'required|string',
            'range_harga' => 'required|string',
            'restaurant_image' => 'required|image|max:2048',
            'menu_1' => 'nullable|image|max:2048',
            'menu_2' => 'nullable|image|max:2048',
            'menu_3' => 'nullable|image|max:2048',
            'menu_4' => 'nullable|image|max:2048',
            'menu_5' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $restaurant = new Restaurant();
        $restaurant->nama = $request->nama;
        $restaurant->alamat = $request->alamat;
        $restaurant->hari_buka_awal = $request->hari_buka_awal;
        $restaurant->hari_buka_akhir = $request->hari_buka_akhir;
        $restaurant->jam_buka = $request->jam_buka;
        $restaurant->jam_tutup = $request->jam_tutup;
        $restaurant->nomor_telepon = $request->nomor_telepon;
        $restaurant->range_harga = $request->range_harga;

        // Handle restaurant image upload
        if ($request->hasFile('restaurant_image')) {
            $imageData = file_get_contents($request->file('restaurant_image')->path());
            $restaurant->restaurant_image = $imageData;
        }

        // Handle menu images upload
        for ($i = 1; $i <= 5; $i++) {
            $field = "menu_{$i}";
            if ($request->hasFile($field)) {
                $imageData = file_get_contents($request->file($field)->path());
                $restaurant->$field = $imageData;
            }
        }

        $restaurant->save();

        return response()->json([
            'message' => 'Restaurant created successfully',
            'restaurant' => $restaurant
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        return response()->json($restaurant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama' => 'nullable|string',
            'alamat' => 'nullable|string',
            'hari_buka_awal' => 'nullable|string',
            'hari_buka_akhir' => 'nullable|string',
            'jam_buka' => 'nullable|string',
            'jam_tutup' => 'nullable|string',
            'nomor_telepon' => 'nullable|string',
            'range_harga' => 'nullable|string',
            'restaurant_image' => 'nullable|image|max:2048',
            'menu_1_new' => 'nullable|string|url',
            'menu_2_new' => 'nullable|string|url',
            'menu_3_new' => 'nullable|string|url',
            'menu_4_new' => 'nullable|string|url',
            'menu_5_new' => 'nullable|string|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update all fields including image URLs
        $restaurant->fill($request->all());
        $restaurant->save();

        return response()->json([
            'message' => 'Restaurant updated successfully',
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
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
    }
}
