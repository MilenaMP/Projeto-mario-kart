const getRandomItem = require("./itemService");

async function battle(character1, character2, power1, power2) {
    console.log(`🥊 ${character1.NOME} VS ${character2.NOME}`);

    if(power1 === power2){
        console.log("Empate no confronto!");
        return;
    }

    let winner = power1 > power2 ? character1 : character2;
    let loser = power1 > power2 ? character2 : character1;

    let item = await getRandomItem();

    console.log(`${loser.NOME} foi atingido por ${item.nome} ${item.emoji}`);
    loser.PONTOS = Math.max(0, loser.PONTOS - item.dano);

    console.log( `${loser.NOME} perdeu ${item.dano} ponto(s)`);

    //TURBO
    let turbo = Math.random() < 0.5;

    if(turbo) {
        console.log(`${winner.NOME} ganhou TURBO ⚡`);
        winner.PONTOS++;
    }
}

module.exports = battle;