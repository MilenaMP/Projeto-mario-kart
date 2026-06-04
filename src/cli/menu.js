const readline = require("readline-sync");
const characters = require("../data/characters");

async function chooseplayer() {
    console.log("🎮 ESCOLHA SEU PERSONAGEM:\n");
    characters.forEach((char, index) => {
        console.log(`${index + 1} - ${char.NOME}`);
    });

    let option = readline.questionInt("\nDigite o numero: ");
    return characters[option - 1];
}

module.exports = chooseplayer;