set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE astone_db;
    CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
    GRANT ALL PRIVILEGES ON DATABASE postgres TO astone_db;
EOSQL