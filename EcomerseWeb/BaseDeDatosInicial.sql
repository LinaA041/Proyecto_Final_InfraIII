-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS ecommercedb;
USE ecommercedb;

-- Tabla de usuarios (con contraseñas en texto plano PARA DESARROLLO)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,  -- Contraseña en texto plano (solo desarrollo)
    full_name VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos (sin imágenes ni categorías)
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos (para el proceso de compra simulado)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Tabla de items del pedido
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insertar 2 usuarios de prueba (contraseñas en texto plano)
INSERT INTO users (username, email, password, full_name) VALUES
('cliente1', 'cliente1@tienda.com', 'cliente123', 'Juan Pérez'),
('cliente2', 'cliente2@tienda.com', 'cliente456', 'María García');

-- Insertar 10 productos de ejemplo (sin imágenes)
INSERT INTO products (name, description, price, stock) VALUES
('Smartphone Básico', 'Pantalla 6.1", 64GB RAM, 4GB RAM', 299.99, 50),
('Laptop Estándar', '14 pulgadas, Intel i5, 8GB RAM, 256GB SSD', 799.99, 30),
('Tablet 8 Pulgadas', 'Android 11, 32GB almacenamiento', 149.99, 40),
('Teclado USB', 'Teclado QWERTY español, diseño ergonómico', 24.99, 100),
('Mouse Inalámbrico', '1600DPI, 2.4GHz, batería 12 meses', 19.99, 150),
('Monitor 22"', 'Full HD 1080p, panel IPS', 159.99, 25),
('Impresora Multifunción', 'Imprime/escanea/copia, WiFi', 129.99, 15),
('Disco Duro Externo 1TB', 'USB 3.0, compatible con PC/Mac', 59.99, 60),
('Altavoz Bluetooth', 'Sonido estéreo, batería 10h', 39.99, 80),
('Cargador Rápido 20W', 'USB-C, carga rápida para smartphones', 22.99, 200);