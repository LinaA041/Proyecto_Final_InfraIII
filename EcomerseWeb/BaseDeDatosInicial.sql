-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ecommercedb;
USE ecommercedb;

-- Tabla de usuarios (con contraseñas en texto plano)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,  -- Contraseña en texto plano (NO usar en producción)
);

-- Tabla de productos (sin categorías)
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios con contraseñas simples
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@tienda.com', 'admin123'),  -- Contraseña fácil
('cliente', 'cliente@tienda.com', 'cliente123');  -- Contraseña fácil

-- Insertar 10 productos básicos
INSERT INTO products (name, description, price, stock) VALUES
('Smartphone Básico', 'Pantalla 6.1", 64GB almacenamiento', 299.99, 50),
('Laptop Estándar', '14 pulgadas, 8GB RAM, 256GB SSD', 799.99, 30),
('Tablet 8"', '32GB, WiFi, Android', 149.99, 40),
('Teclado Inalámbrico', 'USB, diseño ergonómico', 29.99, 100),
('Mouse Óptico', '1600DPI, 3 botones', 12.99, 150),
('Monitor 24"', 'Full HD, panel IPS', 159.99, 25),
('Impresora Multifunción', 'Imprime, escanea, copia', 129.99, 15),
('Disco Duro 1TB', 'USB 3.0, portable', 49.99, 60),
('Altavoz Bluetooth', '10W, batería 12h', 39.99, 80),
('Cargador Rápido', '20W, USB-C', 19.99, 200);