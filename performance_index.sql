-- Indexes for USER table
CREATE INDEX idx_user_email ON "USER" (email);
CREATE INDEX idx_user_username ON "USER" (username);

-- Indexes for RESTAURANT table
CREATE INDEX idx_restaurant_nama ON RESTAURANT (nama);

-- Indexes for REVIEW table
CREATE INDEX idx_review_user_id ON REVIEW (user_id);
CREATE INDEX idx_review_restaurant_id ON REVIEW (restaurant_id);