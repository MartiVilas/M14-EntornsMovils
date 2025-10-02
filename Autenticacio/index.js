import express from 'express';
import {PORT, SECRET_JWT_KEY} from './config.js';

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT,() => console.log(`Abierto en el puerto ${PORT}`))

// Inici dels enpoints

app.get('/', (req, res) => { 
   res.render('register') 
});

app.post('/register', (req, res) => {
   // desestructurar del body lo que queremos usar
    const {username, password} = req.body;
    
});