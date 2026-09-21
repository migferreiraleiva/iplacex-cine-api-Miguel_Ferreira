import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import ActorRoutes from './src/actor/routes.js';

const app = express();
// Escuchar el puerto dinámico de Render o el 3000 si estás en local
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

// Conectar a MongoDB Atlas
connectDB()
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB Atlas:', error);
    });

// Levantar el servidor fuera de la promesa para que Render detecte el puerto de inmediato
app.listen(PORT, () => {
    console.log(`Servidor de Express escuchando exitosamente en el puerto ${PORT}`);
});