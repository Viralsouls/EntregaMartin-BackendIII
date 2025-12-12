export const generateMockPets = (quantity = 1) => {
    const pets = [];

    for (let i = 0; i < quantity; i++) {
        pets.push({
            name: `Pet${i}`,
            species: "dog",
            age: Math.floor(Math.random() * 15) + 1
        });
    }

    return pets;
};