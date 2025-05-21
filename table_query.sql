-- USER TABLE
CREATE TABLE "USER" (
    id VARCHAR2(36) PRIMARY KEY,
    user_profile BLOB,
    email VARCHAR2(255) NOT NULL UNIQUE,
    is_admin NUMBER(1) DEFAULT 0 NOT NULL,
    username VARCHAR2(50) NOT NULL UNIQUE,
    no_telepon VARCHAR2(20),
    nama_depan VARCHAR2(100),
    nama_belakang VARCHAR2(100),
    tanggal_lahir VARCHAR2(2),
    bulan_lahir VARCHAR2(20),
    tahun_lahir VARCHAR2(4),
    jenis_kelamin VARCHAR2(10),
    password VARCHAR2(255) NOT NULL
);

-- RESTAURANT TABLE
CREATE TABLE RESTAURANT (
    id VARCHAR2(36) PRIMARY KEY,
    restaurant_image BLOB NOT NULL,
    nama VARCHAR2(100) NOT NULL,
    alamat VARCHAR2(255) NOT NULL,
    hari_buka_awal VARCHAR2(20) NOT NULL,
    hari_buka_akhir VARCHAR2(20) NOT NULL,
    jam_buka VARCHAR2(10) NOT NULL,
    jam_tutup VARCHAR2(10) NOT NULL,
    nomor_telepon VARCHAR2(20) NOT NULL,
    range_harga VARCHAR2(50) NOT NULL,
    menu_1 BLOB,
    menu_2 BLOB,
    menu_3 BLOB,
    menu_4 BLOB,
    menu_5 BLOB
);

-- REVIEW TABLE
CREATE TABLE REVIEW (
    id VARCHAR2(36) PRIMARY KEY,
    user_id VARCHAR2(36) NOT NULL,
    restaurant_id VARCHAR2(36) NOT NULL,
    photo_1 BLOB,
    photo_2 BLOB,
    photo_3 BLOB,
    photo_4 BLOB,
    photo_5 BLOB,
    judul VARCHAR2(200) NOT NULL,
    menu VARCHAR2(255) NOT NULL,
    tanggal_pergi TIMESTAMP NOT NULL,
    harga_per_orang VARCHAR2(50) NOT NULL,
    rasa_makanan NUMBER(1) NOT NULL CHECK (rasa_makanan BETWEEN 0 AND 5),
    suasana NUMBER(1) NOT NULL CHECK (suasana BETWEEN 0 AND 5),
    harga_dibandingkan_rasa NUMBER(1) NOT NULL CHECK (harga_dibandingkan_rasa BETWEEN 0 AND 5),
    pelayanan NUMBER(1) NOT NULL CHECK (pelayanan BETWEEN 0 AND 5),
    kebersihan NUMBER(1) NOT NULL CHECK (kebersihan BETWEEN 0 AND 5),
    
    -- Foreign keys
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES "USER" (id),
    CONSTRAINT fk_review_restaurant FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT (id)
);