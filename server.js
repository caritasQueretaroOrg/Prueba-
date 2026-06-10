const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio.html'));
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/suscripcion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'suscripcion.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
