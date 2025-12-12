import { Router } from 'express';
import { generateMockUsers } from '../mocks/mockingUsers.js';
import { generateMockPets } from '../mocks/mockingPets.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

const router = Router();

/**
 * GET /mockingusers
 * Genera 50 usuarios mockeados.
 */
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.send({ status: 'success', users });
});

/**
 * GET /mockingpets
 * Genera mascotas mockeadas.
 */
router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets();
    res.send({ status: 'success', pets });
});

/**
 * POST /generateData
 * Genera usuarios y mascotas reales en la DB
 */
router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        const mockUsers = generateMockUsers(Number(users));
        const mockPets = generateMockPets(Number(pets));

        await userModel.insertMany(mockUsers);
        await petModel.insertMany(mockPets);

        res.send({
            status: 'success',
            insertedUsers: mockUsers.length,
            insertedPets: mockPets.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: error.message });
    }
});

export default router;