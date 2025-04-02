const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Datos en memoria
let products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 }
];


// Default endpoint
app.get('/', (req, res) => {
    res.json({ message: "You are in the server. Add /products for more information about all available products. Add /products/id for more information about a specific product" });
});

// Obtener todos los productos
app.get('/products', (req, res) => {
    res.json(products);
});

// Obtener un producto por ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

// Agregar un nuevo producto
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    
    // Verificar si el ID ya existe
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: 'El ID del producto ya existe' });
    }
    
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});