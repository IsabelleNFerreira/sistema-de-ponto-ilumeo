import express, { json } from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('API rodando 🎉');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
