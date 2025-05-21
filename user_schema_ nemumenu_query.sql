-- First connect as SYSTEM
CONNECT system/"password"@localhost:1521/FREEPDB1

-- Then create the user
CREATE USER foodreview IDENTIFIED BY "password";
GRANT CONNECT, RESOURCE, CREATE VIEW, CREATE PROCEDURE, CREATE TRIGGER TO foodreview;
GRANT UNLIMITED TABLESPACE TO foodreview;

-- Then switch to that user
ALTER SESSION SET CURRENT_SCHEMA = foodreview;