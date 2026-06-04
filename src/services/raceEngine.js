const rollDice = require("../utils/dice");
const getRandomBlock = require("../utils/random");
const getRandomItem = require("./itemService");
const logRollResult = require("../utils/log");
const showRaceBar = require("../utils/raceBar");
const delay = require("../utils/delay");

async function playRaceEngine(player1, player2) {

    for (let round = 1; round <= 5; round++) {

        console.log(`\n🏁 Rodada ${round}`);
        await delay(1000);
        
        const block = await getRandomBlock();

        console.log(`Bloco: ${block}`);
        await delay(1000);

        const dice1 = await rollDice();
        const dice2 = await rollDice();

        let total1 = 0;
        let total2 = 0;

        // RETA
        if (block === "RETA") {

            total1 = dice1 + player1.VELOCIDADE;
            total2 = dice2 + player2.VELOCIDADE;

            await logRollResult(
                player1,
                "velocidade",
                dice1,
                player1.VELOCIDADE
            );

            await delay(1200);

            await logRollResult(
                player2,
                "velocidade",
                dice2,
                player2.VELOCIDADE
            );
            await delay(1200);
        }

        // CURVA
        if (block === "CURVA") {

            total1 = dice1 + player1.MANOBRABILIDADE;
            total2 = dice2 + player2.MANOBRABILIDADE;

            await logRollResult(
                player1,
                "manobrabilidade",
                dice1,
                player1.MANOBRABILIDADE
            );
            await delay(1200);

            await logRollResult(
                player2,
                "manobrabilidade",
                dice2,
                player2.MANOBRABILIDADE
            );
            await delay(1200);
        }

        // CONFRONTO
        if (block === "CONFRONTO") {

            const powerResult1 = dice1 + player1.PODER;
            const powerResult2 = dice2 + player2.PODER;

            console.log(
                `${player1.NOME} confrontou com ${player2.NOME}! 🥊`
            );
            await delay(1500);

            await logRollResult(
                player1,
                "poder",
                dice1,
                player1.PODER
            );

            await logRollResult(
                player2,
                "poder",
                dice2,
                player2.PODER
            );

            // PLAYER 1 VENCEU
            if (powerResult1 > powerResult2) {

                const item = await getRandomItem();

                console.log(
                    `${player1.NOME} venceu o confronto!`
                );
                await delay(1500);

                console.log(
                    `${player2.NOME} foi atingido por ${item.nome} ${item.emoji}`
                );

                player2.VIDA = Math.max(
                    0,
                    player2.VIDA - item.dano
                );

                console.log(
                    `${player2.NOME} perdeu ${item.dano} vida(s)`
                );

                // TURBO
                if (Math.random() < 0.5) {

                    console.log(
                        `${player1.NOME} ganhou um TURBO ⚡`
                    );

                    player1.PONTOS++;
                }
            }

            // PLAYER 2 VENCEU
            else if (powerResult2 > powerResult1) {

                const item = await getRandomItem();

                console.log(
                    `${player2.NOME} venceu o confronto!`
                );
                await delay(1500);

                console.log(
                    `${player1.NOME} foi atingido por ${item.nome} ${item.emoji}`
                );

                player1.VIDA = Math.max(
                    0,
                    player1.VIDA - item.dano
                );

                console.log(
                    `${player1.NOME} perdeu ${item.dano} vida(s)`
                );

                // TURBO
                if (Math.random() < 0.5) {

                    console.log(
                        `${player2.NOME} ganhou um TURBO ⚡`
                    );

                    player2.PONTOS++;
                }
            }

            // EMPATE
            else {

                console.log(
                    "Confronto empatado! Nenhum dano causado."
                );
            }
        }

        // PONTOS DE RETA E CURVA
        if (block !== "CONFRONTO") {

            if (total1 > total2) {

                console.log(
                    `${player1.NOME} marcou um ponto!`
                );

                player1.PONTOS++;
            }

            else if (total2 > total1) {

                console.log(
                    `${player2.NOME} marcou um ponto!`
                );

                player2.PONTOS++;
            }

            else {

                console.log("Empate!");
            }
        }

        console.log("-----------------------------");

        await delay(1000);
        showRaceBar(player1, player2);

        // ELIMINAÇÃO
        if (
            player1.VIDA <= 0 ||
            player2.VIDA <= 0
        ) {

            console.log(
                "\n💀 Um competidor foi eliminado!"
            );

            break;
        }
    }
}

module.exports = playRaceEngine;