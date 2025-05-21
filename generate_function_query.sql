-- Create a function to generate UUIDs
CREATE OR REPLACE FUNCTION generate_uuid RETURN VARCHAR2 IS
    v_uuid VARCHAR2(36);
BEGIN
    SELECT REGEXP_REPLACE(RAWTOHEX(SYS_GUID()), '([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})', '\1-\2-\3-\4-\5') INTO v_uuid FROM DUAL;
    RETURN v_uuid;
END;
/