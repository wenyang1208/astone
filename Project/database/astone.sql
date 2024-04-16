/*
A PostgreSQL Database Schema for Astone E-commerce Platform
*/

/* Drop existing tables */

DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS product;

/* Create tables */

-- Account table
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    type char(1) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender char(1) NOT NULL,
    phone integer NOT NULL,
    address text NOT NULL
);
-- Add constraints
ALTER TABLE account ADD CONSTRAINT check_type CHECK (type IN ('c', 's', 'a'));
ALTER TABLE account ADD CONSTRAINT check_gender CHECK (gender IN ('m', 'f', 'o'));
-- Add comments
COMMENT ON TABLE account IS 'Stores account information for customers, sellers, and administrators';
COMMENT ON COLUMN account.id IS 'unique identifier for the account (pk)';
COMMENT ON COLUMN account.email IS 'email address of the account';
COMMENT ON COLUMN account.password IS 'password for the account';
COMMENT ON COLUMN account.type IS 'account type (c: customer, s: seller, a: admin)';
COMMENT ON COLUMN account.first_name IS 'first name of user';
COMMENT ON COLUMN account.last_name IS 'last name of user';
COMMENT ON COLUMN account.gender IS 'gender of user (m: male, f: female, o: other)';
COMMENT ON COLUMN account.phone IS 'phone number of user';
COMMENT ON COLUMN account.address IS 'address of user';

-- Product table
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    assets text[] NOT NULL,
    colors text[] NOT NULL,
    sizes text[] NOT NULL,
    price numeric(10, 2) NOT NULL,
    stock integer NOT NULL
);
-- Add comments
COMMENT ON TABLE product IS 'Stores product information';
COMMENT ON COLUMN product.id IS 'unique identifier for the product (pk)';
COMMENT ON COLUMN product.name IS 'name of the product';
COMMENT ON COLUMN product.description IS 'description of the product';
COMMENT ON COLUMN product.category IS 'category of the product';
COMMENT ON COLUMN product.assets IS 'array of image URLs for the product';
COMMENT ON COLUMN product.colors IS 'array of available colors for the product';
COMMENT ON COLUMN product.sizes IS 'array of available sizes for the product';
COMMENT ON COLUMN product.price IS 'price of the product';
COMMENT ON COLUMN product.stock IS 'available stock of the product';

/* Insert sample data */

INSERT INTO account (email, password, type, first_name, last_name, gender, phone, address) VALUES
('harrypotter@monash.edu', 'abc123', 'c', 'Harry', 'Potter', 'm', 1234567890, '4 Privet Drive, Little Whinging, Surrey'),
('ronweasley@monash.edu', 'abc123', 'c', 'Ron', 'Weasley', 'm', 1234567890, 'The Burrow, Ottery St Catchpole, Devon'),
('hermionegranger@monash.edu', 'abc123', 'c', 'Hermione', 'Granger', 'f', 1234567890, '12 Grimmauld Place, London');

INSERT INTO product (name, description, category, assets, colors, sizes, price, stock) VALUES
('Product 1', 'A product for something', 'Shirt', ARRAY['assets/shirt1.jpg', 'assets/shirt2.jpg'], ARRAY['brown', 'white'], ARRAY['S', 'M', 'L'], 29.99, 100),
('Product 2', 'Another product for something', 'Pants', ARRAY['assets/pants1.jpg', 'assets/pants2.jpg'], ARRAY['black', 'grey'], ARRAY['S', 'M', 'L'], 99.99, 50),
('Product 3', 'Also another product for something', 'Dress', ARRAY['assets/dress1.jpg', 'assets/dress2.jpg'], ARRAY['pink', 'purple'], ARRAY['S', 'M', 'L'], 49.99, 75);

/* Fetch data */

SELECT * FROM account;
SELECT * FROM product;
