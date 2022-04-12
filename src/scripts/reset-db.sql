--	WARNING: THIS SCRIPT WILL DESTROY ALL DATA IN THE DATABASE
--
--	To run from CLI:
--	$ psql -U [USERNAME] -d [DATABASE] -a -f src/scripts/reset-db.sql
--

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;