<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'nullable|string',
            'nama_depan' => 'nullable|string',
            'nama_belakang' => 'nullable|string',
            'no_telepon' => 'nullable|string',
            'tanggal_lahir' => 'nullable|string|size:2',
            'bulan_lahir' => 'nullable|string',
            'tahun_lahir' => 'nullable|string|size:4',
            'jenis_kelamin' => 'nullable|string',
            'user_profile_new' => 'nullable|string|url', // Now accepts URL string
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        // Update text fields
        $user->fill($request->only([
            'email',
            'nama_depan',
            'nama_belakang',
            'no_telepon',
            'tanggal_lahir',
            'bulan_lahir',
            'tahun_lahir',
            'jenis_kelamin',
            'user_profile_new' // Supabase URL
        ]));

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }
}
