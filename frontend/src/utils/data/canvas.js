// Stockage des identifiants générés pour éviter les doublons
const generatedIds = [];

// Génération de l'ID unique
function generateUniqueRandomId() {
    // Longueur de l'ID souhaitée
    const length = 8;
    // Caractères possibles pour l'ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // Générer l'ID caractère par caractère
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Vérifier si l'ID généré existe déjà dans le tableau
    if (generatedIds.includes(result)) {
        // Si l'ID existe déjà, rappeler la fonction pour en générer un nouveau
        return generateUniqueRandomId();
    }

    // Si l'ID est unique, l'ajouter au tableau
    generatedIds.push(result);

    return result;
}

// Génération des identifiants
let id = generateUniqueRandomId();
let idPage = generateUniqueRandomId();
let idSinglePage = generateUniqueRandomId();

// Création de l'objet canvasSkeleton
let canvasSkeleton = {
    "id": id,
    "name": "Sans titre",
    "pages": [
        {
            "id": idPage,
            "name": "Sans titre",
            "objects": []
        }
    ]
};

// Création de l'objet pageSkeleton
let pageSkeleton = {
    "id": idSinglePage,
    "name": "Sans titre",
    "objects": []
}

export default { canvasSkeleton, pageSkeleton };
