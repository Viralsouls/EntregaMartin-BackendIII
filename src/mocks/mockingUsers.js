import mongoose from 'mongoose';
import { createHash } from '../utils/index.js';

const ROLES = ['user', 'admin'];

const generateSingleUser = async () => {
    const hashedPassword = await createHash('coder123');
    const randomNumber = Math.floor(Math.random() * 100000);

    const firstName = `User${randomNumber}`;
    const lastName = `Test${randomNumber}`;
    const email = `user${randomNumber}@test.com`;

    return {
        _id: new mongoose.Types.ObjectId(),   // imita un _id de Mongo
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        role: ROLES[Math.floor(Math.random() * ROLES.length)],
        pets: []
    };
};

export const generateMockUsers = async (quantity = 1) => {
    const users = [];
    for (let i = 0; i < quantity; i++) {
        const user = await generateSingleUser();
        users.push(user);
    }
    return users;
};