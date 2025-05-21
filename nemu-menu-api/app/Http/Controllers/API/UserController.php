<?php

namespace App\Http\Controllers\API;

use Illuminate\Contracts\Auth\Authenticatable;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Storage;

class UserController extends Authenticatable
{
    use HasUuids;

    // Make sure your primary key is properly configured
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_depan' => 'nullable|string',
            'nama_belakang' => 'nullable|string',
            'no_telepon' => 'nullable|string',
            'tanggal_lahir' => 'nullable|string|size:2',
            'bulan_lahir' => 'nullable|string',
            'tahun_lahir' => 'nullable|string|size:4',
            'jenis_kelamin' => 'nullable|string',
            'user_profile' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        // Update text fields
        $user->fill($request->only([
            'nama_depan',
            'nama_belakang',
            'no_telepon',
            'tanggal_lahir',
            'bulan_lahir',
            'tahun_lahir',
            'jenis_kelamin'
        ]));

        // Handle profile image upload
        if ($request->hasFile('user_profile')) {
            $imageData = file_get_contents($request->file('user_profile')->path());
            $user->user_profile = $imageData;
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }
}
