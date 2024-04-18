type GenerateId = () => number;

const generateId = (): GenerateId => {
    let id: number = 0;

    return function() {
        return id++;
    }
}

export const newId: GenerateId = generateId();