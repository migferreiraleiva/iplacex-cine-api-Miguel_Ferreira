import { MongoClient } from 'mongodb';

const URI = "mongodb+srv://migferreiraleiva_db_user:hola1234@eva-u3-express.vgc8htf.mongodb.net/?appName=eva-u3-express";

const client = new MongoClient(URI);
export const DB_NAME = 'cine-db';

export async function connectDB() {
    try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB Atlas');
        return client.db(DB_NAME);
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        throw error;
    }
}

export { client };