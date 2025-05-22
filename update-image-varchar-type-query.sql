-- Add image URL columns to existing Oracle tables

-- 1. USER table - Add profile image URL column
ALTER TABLE "USER" ADD "USER_PROFILE_NEW" VARCHAR2(500);

-- 2. RESTAURANT table - Add restaurant and menu image URL columns
ALTER TABLE "RESTAURANT" 
ADD (
    "RESTAURANT_IMAGE_NEW" VARCHAR2(500),
    "MENU_1_NEW" VARCHAR2(500),
    "MENU_2_NEW" VARCHAR2(500),
    "MENU_3_NEW" VARCHAR2(500),
    "MENU_4_NEW" VARCHAR2(500),
    "MENU_5_NEW" VARCHAR2(500)
);

-- 3. REVIEW table - Add review photo URL columns
ALTER TABLE "REVIEW" 
ADD (
    "PHOTO_1_NEW" VARCHAR2(500),
    "PHOTO_2_NEW" VARCHAR2(500),
    "PHOTO_3_NEW" VARCHAR2(500),
    "PHOTO_4_NEW" VARCHAR2(500),
    "PHOTO_5_NEW" VARCHAR2(500)
);

-- Add comments for documentation
COMMENT ON COLUMN "USER"."USER_PROFILE_NEW" IS 'Supabase URL for user profile image';
COMMENT ON COLUMN "RESTAURANT"."RESTAURANT_IMAGE_NEW" IS 'Supabase URL for restaurant main image';
COMMENT ON COLUMN "RESTAURANT"."MENU_1_NEW" IS 'Supabase URL for menu image 1';
COMMENT ON COLUMN "RESTAURANT"."MENU_2_NEW" IS 'Supabase URL for menu image 2';
COMMENT ON COLUMN "RESTAURANT"."MENU_3_NEW" IS 'Supabase URL for menu image 3';
COMMENT ON COLUMN "RESTAURANT"."MENU_4_NEW" IS 'Supabase URL for menu image 4';
COMMENT ON COLUMN "RESTAURANT"."MENU_5_NEW" IS 'Supabase URL for menu image 5';
COMMENT ON COLUMN "REVIEW"."PHOTO_1_NEW" IS 'Supabase URL for review photo 1';
COMMENT ON COLUMN "REVIEW"."PHOTO_2_NEW" IS 'Supabase URL for review photo 2';
COMMENT ON COLUMN "REVIEW"."PHOTO_3_NEW" IS 'Supabase URL for review photo 3';
COMMENT ON COLUMN "REVIEW"."PHOTO_4_NEW" IS 'Supabase URL for review photo 4';
COMMENT ON COLUMN "REVIEW"."PHOTO_5_NEW" IS 'Supabase URL for review photo 5';

-- Verify the changes
SELECT table_name, column_name, data_type, data_length 
FROM user_tab_columns 
WHERE table_name IN ('USER', 'RESTAURANT', 'REVIEW') 
  AND (column_name LIKE '%IMAGE%' OR column_name LIKE '%PHOTO%' OR column_name LIKE '%MENU%' OR column_name = 'USER_PROFILE')
ORDER BY table_name, column_name;