import { ObjectId } from 'mongodb';
import { client, DB_NAME } from '../common/db.js';

export const actorCollection = 'actor';

export async function handleInsertActorRequest(req, res) {
    const { idPelicula, nombre, edad, estaRetirado, premios, nombrePelicula } = req.body;
    const db = client.db(DB_NAME);

    return db.collection('pelicula').findOne({ nombre: String(nombrePelicula) })
        .then((peliculaEncontrada) => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: 'La película especificada no existe en la base de datos' });
            }

            const nuevoActor = {
                idPelicula: String(peliculaEncontrada._id),
                nombre: String(nombre),
                edad: parseInt(edad),
                estaRetirado: Boolean(estaRetirado),
                premios: Array.isArray(premios) ? premios : []
            };

            return db.collection(actorCollection).insertOne(nuevoActor)
                .then((result) => res.status(201).json({ _id: result.insertedId, ...nuevoActor }));
        })
        .catch(() => res.status(500).json({ error: 'Error al insertar actor' }));
}

export async function handleGetActoresRequest(req, res) {
    const db = client.db(DB_NAME);

    return db.collection(actorCollection).find().toArray()
        .then((actores) => res.status(200).json(actores))
        .catch(() => res.status(500).json({ error: 'Error al obtener actores' }));
}

export async function handleGetActorByIdRequest(req, res) {
    const { id } = req.params;
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        return res.status(400).json({ error: 'Id mal formado' });
    }

    const db = client.db(DB_NAME);
    return db.collection(actorCollection).findOne({ _id: objectId })
        .then((actor) => {
            if (!actor) {
                return res.status(404).json({ error: 'Actor no encontrado' });
            }
            return res.status(200).json(actor);
        })
        .catch(() => res.status(500).json({ error: 'Error al obtener actor por ID' }));
}

export async function handleGetActoresByPeliculaRequest(req, res) {
    const { pelicula } = req.params;
    const db = client.db(DB_NAME);

    return db.collection(actorCollection).find({ idPelicula: String(pelicula) }).toArray()
        .then((actores) => res.status(200).json(actores))
        .catch(() => res.status(500).json({ error: 'Error al obtener actores de la película' }));
}