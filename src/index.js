const characters= require("./data/characters");
const chooseplayer = require("./cli/menu");
const playRaceEngine = require("./services/raceEngine");

async function declareWinner(player1, player2) {

    console.log("\n📊 RESULTADO FINAL");

    console.log(
        `${player1.NOME}: ${player1.PONTOS} ponto(s) | ❤️ ${player1.VIDA}`
    );

    console.log(
        `${player2.NOME}: ${player2.PONTOS} ponto(s) | ❤️ ${player2.VIDA}`
    );

    // vitória por eliminação

    if (player1.VIDA <= 0) {
        console.log(
            `🏆 ${player2.NOME} venceu por eliminação!`
        );
        return;
    }

    if (player2.VIDA <= 0) {
        console.log(
            `🏆 ${player1.NOME} venceu por eliminação!`
        );
        return;
    }

    // vitória por pontos

    if (player1.PONTOS > player2.PONTOS) {

        console.log(
            `\n🏆 ${player1.NOME} venceu a corrida!`
        );

    } else if (player2.PONTOS > player1.PONTOS) {

        console.log(
            `\n🏆 ${player2.NOME} venceu a corrida!`
        );

    } else {

        console.log(
            "\n🤝 A corrida terminou em empate!"
        );
    }
}
 
//funcao de entrada, auto invocada(Auto Invoke)
(async function main(){ 
    console.clear();
    let player1 = await chooseplayer();
    let opponents = characters.filter(char => char.NOME !== player1.NOME);
    let randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];

    console.log( `\n🏁 ${player1.NOME} VS ${randomOpponent.NOME}\n`);
        
    await playRaceEngine(player1, randomOpponent);
    await declareWinner(player1, randomOpponent);
})();