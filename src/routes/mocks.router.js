import { Router } from 'express';
import { usersService, petsService } from '../services/index.js';
import { generateMockUsers } from '../mocks/mockingUsers.js';
import { generateMockPets } from '../mocks/mockingPets.js';

const router = Router();

const MAX_USERS = 1000;
const MAX_PETS = 1000;

// GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
    const quantity = parseInt(req.query.quantity) || 100;

    if (quantity <= 0) {
        return res.status(400).send({
            status: 'error',
            error: 'quantity debe ser un número mayor a 0'
        });
    }

    if (quantity > MAX_PETS) {
        return res.status(400).send({
            status: 'error',
            error: `No se pueden generar más de ${MAX_PETS} mascotas por petición`
        });
    }

    const pets = generateMockPets(quantity);
    res.send({ status: 'success', payload: pets });
});

// GET /api/mocks/mockingusers
router.get('/mockingusers', async (req, res) => {
    try {
        const quantity = parseInt(req.query.quantity) || 50;

        if (quantity <= 0) {
            return res.status(400).send({
                status: 'error',
                error: 'quantity debe ser un número mayor a 0'
            });
        }

        if (quantity > MAX_USERS) {
            return res.status(400).send({
                status: 'error',
                error: `No se pueden generar más de ${MAX_USERS} usuarios por petición`
            });
        }

        const users = await generateMockUsers(quantity);
        res.send({ status: 'success', payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error generating mock users' });
    }
});

// POST /api/mocks/generateData
router.post('/generateData', async (req, res) => {
    try {
        let { users = 0, pets = 0 } = req.body;

        users = parseInt(users) || 0;
        pets = parseInt(pets) || 0;

        if (users < 0 || pets < 0) {
            return res.status(400).send({
                status: 'error',
                error: 'users y pets deben ser números positivos'
            });
        }

        if (users > MAX_USERS || pets > MAX_PETS) {
            return res.status(400).send({
                status: 'error',
                error: `Límites superados. Máx users: ${MAX_USERS}, máx pets: ${MAX_PETS}`
            });
        }

        // Generar usuarios mock y guardarlos en la base
        const mockUsers = await generateMockUsers(users);
        const createdUsers = [];
        for (const user of mockUsers) {
            const { _id, ...userData } = user; // que Mongo genere su propio _id
            const created = await usersService.create(userData);
            createdUsers.push(created);
        }

        // Generar mascotas mock y guardarlas en la base
        const mockPets = generateMockPets(pets);
        const createdPets = [];
        for (const pet of mockPets) {
            const created = await petsService.create(pet);
            createdPets.push(created);
        }

        res.send({
            status: 'success',
            message: 'Mock data generada e insertada correctamente',
            payload: {
                usersInserted: createdUsers.length,
                petsInserted: createdPets.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error generating mock data' });
    }
});

export default router;