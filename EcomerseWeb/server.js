const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Conexión a MySQL (sin pool para simplificar)
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ecommercedb'
};

// Endpoint de login simple
app.post('/api/login', express.json(), async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [users] = await connection.query(
            'SELECT * FROM users WHERE username = ? AND password = ?', 
            [username, password]  // Comparación directa (NO seguro para producción)
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        
        res.json({ 
            user_id: users[0].user_id,
            username: users[0].username
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Endpoint para productos
app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [products] = await connection.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.listen(3000, () => console.log('Servidor listo en puerto 3000'));