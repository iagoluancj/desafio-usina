require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const supabase = require('./server');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewsRoutes = require('./src/routes/reviewsRoutes');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;

function gerarToken(userId) { //Configuração do JWT junto ao seu tempo de expires. 
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '20h' });
}

app.post('/register', async (req, res) => { //Sem muita compliação, realiza o registro. 
    const { name, email, password } = req.body;
    console.log(name, email, password)

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // utlizando bcrypt para encriptar. 

        const { data, error } = await supabase
            .from('users')
            .insert([{ email, name, password: hashedPassword }]);

        if (error) throw error;

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.log(`Server: Erro ao registrar usuário: ${error.message}`);
        res.status(500).json({ message: `Server: Erro ao registrar usuário ${error.message}`, error });
    }
});

app.post('/login', async (req, res) => { //Também sem muita complicação, realiza o login. 
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, password')
            .eq('email', email)
            .single();

        if (error || !data) return res.status(400).json({ message: 'Email ou senha inválidos.' });

        const senhaValida = await bcrypt.compare(password, data.password); // Utilziando bcrypt para desencriptar. 
        if (!senhaValida) return res.status(400).json({ message: 'Email ou senha inválidos.' });

        const token = gerarToken(data.id);
        res.json({ token, user: { id: data.id, email: data.email, name: data.name } });
    } catch (error) {
        res.status(500).json({ message: `Erro ao fazer login ${error.message}`, error });
    }
});

app.get('/validar-token', (req, res) => { //Rota muito utilizada durante a aplicação, para garantir que o usuário está de fato logado. 
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificação via JWT. 
        res.json({ message: 'Token válido', email: decoded.email });
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
});

app.use('/movies', movieRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(3001, () => {
    console.log(`Servidor rodando na porta ${3001}`);
});