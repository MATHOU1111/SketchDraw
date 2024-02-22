
// Génération de l'ID :
function generateRandomId() {
    // Longueur de l'ID souhaitée
    const length = 8;
    // Caractères possibles pour l'ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // Générer l'ID caractère par caractère
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

let id = generateRandomId();
let id1 = generateRandomId();

let canvasSkeleton = {
    "id": id,
    "name": "",
    "pages": [{
        id: id1,
        objects : []
    }]
};

export default canvasSkeleton;