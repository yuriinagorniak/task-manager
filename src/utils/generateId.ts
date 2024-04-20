type GenerateId = () => string;

export const generateId = (prefix: string): GenerateId => {
    let id: number = 0;

    return function() {
        return prefix + '-' + id++;
    }
}

// export const newId: GenerateId = generateId();