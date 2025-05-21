-- Trigger for User table
CREATE OR REPLACE TRIGGER user_before_insert
BEFORE INSERT ON "USER"
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        :NEW.id := generate_uuid();
    END IF;
END;
/

-- Trigger for Restaurant table
CREATE OR REPLACE TRIGGER restaurant_before_insert
BEFORE INSERT ON RESTAURANT
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        :NEW.id := generate_uuid();
    END IF;
END;
/

-- Trigger for Review table
CREATE OR REPLACE TRIGGER review_before_insert
BEFORE INSERT ON REVIEW
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        :NEW.id := generate_uuid();
    END IF;
END;
/