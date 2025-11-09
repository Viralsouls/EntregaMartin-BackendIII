const SPECIES = ['dog', 'cat', 'rabbit', 'hamster', 'parrot'];

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateSinglePet = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const name = `Pet${randomNumber}`;
    const specie = randomFromArray(SPECIES);

    return {
        name,
        specie,
        adopted: false
    };
};

export const generateMockPets = (quantity = 1) => {
    const pets = [];
    for (let i = 0; i < quantity; i++) {
        pets.push(generateSinglePet());
    }
    return pets;
};