-- Insert test user (password would be hashed in a real application)
INSERT INTO "USER" (email, username, password) 
VALUES ('test@example.com', 'testuser', 'password123');

-- Insert test restaurant
INSERT INTO RESTAURANT (
    nama, 
    restaurant_image, 
    alamat, 
    hari_buka_awal, 
    hari_buka_akhir, 
    jam_buka, 
    jam_tutup, 
    nomor_telepon, 
    range_harga
) 
VALUES (
    'Restaurant Test', 
    EMPTY_BLOB(), 
    'Jl. Test No. 123', 
    'Senin', 
    'Jumat', 
    '10:00', 
    '22:00', 
    '021-1234567', 
    'Rp50.000 - Rp100.000'
);

-- Query the inserted data
SELECT id, email, username FROM "USER";
SELECT id, nama, hari_buka_awal, hari_buka_akhir FROM RESTAURANT;