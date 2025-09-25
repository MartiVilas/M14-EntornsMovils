// AE04/index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App ---
const app = express();

// --- Settings ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Utilidades de datos (sync) ---
const DB_PATH = path.join(__dirname, 'db.json');

const readData = () => {
  try {
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ books: [] }, null, 2));
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('readData error:', err);
    return { books: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('writeData error:', err);
  }
};

// --- Rutas ---
app.get('/', (_req, res) => {
  res.send('Welcome to my first API with Node.js :)');
});

// Render de productos con EJS
app.get("/books", (req, res) => {
    const data = readData();

    const user = { name: "Marti Vilas" };
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;

    // Només cridem res.render
    res.render("books", { user, data, htmlMessage });
});

// --- API Books ---
app.get('/books', (_req, res) => {
  const data = readData();
  return res.json(data.books);
});

app.get('/books/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const book = data.books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  return res.json(book);
});

app.post('/books', (req, res) => {
  const data = readData();
  const { name, ...rest } = req.body || {};

  if (!name || String(name).trim() === '') {
    return res.status(400).json({ error: 'Field "name" is required' });
  }

  // Duplicado case-insensitive por nombre
  const exists = data.books.some((b) => b.name?.toLowerCase() === name.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: 'El llibre ja existeix' });
  }

  const nextId = data.books.length ? Math.max(...data.books.map((b) => b.id)) + 1 : 1;

  const newBook = { id: nextId, name, ...rest };
  data.books.push(newBook);
  writeData(data);
  return res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const idx = data.books.findIndex((b) => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  const updated = { ...data.books[idx], ...req.body, id }; // preserva id
  data.books[idx] = updated;
  writeData(data);
  return res.json({ message: 'Book updated successfully', book: updated });
});

app.delete('/books/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const idx = data.books.findIndex((b) => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  data.books.splice(idx, 1);
  writeData(data);
  return res.json({ message: 'Book deleted successfully' });
});

// --- Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
