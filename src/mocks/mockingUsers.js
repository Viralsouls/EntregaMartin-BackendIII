import bcrypt from 'bcrypt';

export const generateMockUsers = (quantity = 1) => {
    const users = [];

    for (let i = 0; i < quantity; i++) {
        users.push({
            first_name: `User${i}`,
            last_name: `Test${i}`,
            email: `user${i}@test.com`,
            password: bcrypt.hashSync("coder123", 10),
            role: Math.random() > 0.5 ? "user" : "admin",
            pets: []
        });
    }

    return users;
};