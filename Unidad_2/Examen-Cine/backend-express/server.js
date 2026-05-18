import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './conexion.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.get('/', (req, res) => res.redirect('/screens/index.html'));

const PORT = process.env.PORT || 3001;

const handleError = (res, error) => res.status(500).json({ error: error.message });

// Películas
app.get('/peliculas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM peliculas ORDER BY titulo');
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/peliculas/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Película no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/peliculas', async (req, res) => {
    try {
        const { titulo, duracion, genero } = req.body;
        await pool.query('INSERT INTO peliculas (titulo, duracion, genero) VALUES (?, ?, ?)', [titulo, duracion, genero]);
        res.status(201).json({ titulo, duracion, genero });
    } catch (error) {
        handleError(res, error);
    }
});

app.put('/peliculas/:id', async (req, res) => {
    try {
        const { titulo, duracion, genero } = req.body;
        await pool.query('UPDATE peliculas SET titulo = ?, duracion = ?, genero = ? WHERE id = ?', [titulo, duracion, genero, req.params.id]);
        res.json({ message: 'Película actualizada' });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/peliculas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM peliculas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Película eliminada' });
    } catch (error) {
        handleError(res, error);
    }
});

// Salas
app.get('/salas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM salas ORDER BY nombre');
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/salas/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM salas WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Sala no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/salas', async (req, res) => {
    try {
        const { nombre, capacidad } = req.body;
        await pool.query('INSERT INTO salas (nombre, capacidad) VALUES (?, ?)', [nombre, capacidad]);
        res.status(201).json({ nombre, capacidad });
    } catch (error) {
        handleError(res, error);
    }
});

app.put('/salas/:id', async (req, res) => {
    try {
        const { nombre, capacidad } = req.body;
        await pool.query('UPDATE salas SET nombre = ?, capacidad = ? WHERE id = ?', [nombre, capacidad, req.params.id]);
        res.json({ message: 'Sala actualizada' });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/salas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM salas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Sala eliminada' });
    } catch (error) {
        handleError(res, error);
    }
});

// Clientes
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes ORDER BY nombre');
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/clientes/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        await pool.query('INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)', [nombre, email, telefono]);
        res.status(201).json({ nombre, email, telefono });
    } catch (error) {
        handleError(res, error);
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        await pool.query('UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?', [nombre, email, telefono, req.params.id]);
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        handleError(res, error);
    }
});

// Horarios
app.get('/horarios', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.id, h.salaId, s.nombre AS salaNombre, h.peliculaId, p.titulo AS peliculaTitulo, h.inicio, h.precio
             FROM horarios h
             JOIN salas s ON h.salaId = s.id
             JOIN peliculas p ON h.peliculaId = p.id
             ORDER BY h.inicio`
        );
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/horarios/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.id, h.salaId, s.nombre AS salaNombre, h.peliculaId, p.titulo AS peliculaTitulo, h.inicio, h.precio
             FROM horarios h
             JOIN salas s ON h.salaId = s.id
             JOIN peliculas p ON h.peliculaId = p.id
             WHERE h.id = ?`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Horario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/horarios', async (req, res) => {
    try {
        const { salaId, peliculaId, inicio, precio } = req.body;
        await pool.query('INSERT INTO horarios (salaId, peliculaId, inicio, precio) VALUES (?, ?, ?, ?)', [salaId, peliculaId, inicio, precio]);
        res.status(201).json({ salaId, peliculaId, inicio, precio });
    } catch (error) {
        handleError(res, error);
    }
});

app.put('/horarios/:id', async (req, res) => {
    try {
        const { salaId, peliculaId, inicio, precio } = req.body;
        await pool.query('UPDATE horarios SET salaId = ?, peliculaId = ?, inicio = ?, precio = ? WHERE id = ?', [salaId, peliculaId, inicio, precio, req.params.id]);
        res.json({ message: 'Horario actualizado' });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/horarios/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM horarios WHERE id = ?', [req.params.id]);
        res.json({ message: 'Horario eliminado' });
    } catch (error) {
        handleError(res, error);
    }
});

// Boletos
app.get('/boletos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT b.id, b.clienteId, c.nombre AS clienteNombre, b.horarioId, h.inicio AS horarioInicio,
                    p.titulo AS peliculaTitulo, s.nombre AS salaNombre, b.asiento, b.precio, b.fechaCompra
             FROM boletos b
             JOIN clientes c ON b.clienteId = c.id
             JOIN horarios h ON b.horarioId = h.id
             JOIN peliculas p ON h.peliculaId = p.id
             JOIN salas s ON h.salaId = s.id
             ORDER BY b.id`
        );
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/boletos/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT b.id, b.clienteId, c.nombre AS clienteNombre, b.horarioId, h.inicio AS horarioInicio,
                    p.titulo AS peliculaTitulo, s.nombre AS salaNombre, b.asiento, b.precio, b.fechaCompra
             FROM boletos b
             JOIN clientes c ON b.clienteId = c.id
             JOIN horarios h ON b.horarioId = h.id
             JOIN peliculas p ON h.peliculaId = p.id
             JOIN salas s ON h.salaId = s.id
             WHERE b.id = ?`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Boleto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/boletos', async (req, res) => {
    try {
        const { clienteId, horarioId, asiento, precio, fechaCompra } = req.body;
        await pool.query('INSERT INTO boletos (clienteId, horarioId, asiento, precio, fechaCompra) VALUES (?, ?, ?, ?, ?)', [clienteId, horarioId, asiento, precio, fechaCompra]);
        res.status(201).json({ clienteId, horarioId, asiento, precio, fechaCompra });
    } catch (error) {
        handleError(res, error);
    }
});

app.put('/boletos/:id', async (req, res) => {
    try {
        const { clienteId, horarioId, asiento, precio, fechaCompra } = req.body;
        await pool.query('UPDATE boletos SET clienteId = ?, horarioId = ?, asiento = ?, precio = ?, fechaCompra = ? WHERE id = ?', [clienteId, horarioId, asiento, precio, fechaCompra, req.params.id]);
        res.json({ message: 'Boleto actualizado' });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/boletos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM boletos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Boleto eliminado' });
    } catch (error) {
        handleError(res, error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Examen Cine corriendo en http://localhost:${PORT}`);
});
