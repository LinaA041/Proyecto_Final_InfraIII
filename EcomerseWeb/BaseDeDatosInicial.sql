CREATE DATABASE IF NOT EXISTS simple_shop;
USE simple_shop;

-- Tabla de usuarios básica
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Tabla de productos CON DESCRIPCIÓN
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,  -- Columna añadida para descripción
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

-- Carrito (1 por usuario)
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Items del carrito
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Datos de ejemplo CON DESCRIPCIONES
INSERT INTO users (username, password) VALUES 
('admin', 'admin123'), 
('cliente', 'cliente123');

INSERT INTO products (name, description, price, stock) VALUES
('Camiseta', 'Camiseta de algodón 100% talla M, disponible en varios colores', 19.99, 100),
('Pantalón', 'Pantalón jeans azul, corte recto, tallas del 28 al 40', 39.99, 50),
('Zapatos', 'Zapatos deportivos para correr, suela antideslizante', 59.99, 30);