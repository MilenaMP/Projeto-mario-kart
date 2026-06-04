function showRaceBar(player1, player2) {

    const pista = 10;

    const bar1 =
        "🟩".repeat(player1.PONTOS) +
        "⬜".repeat(Math.max(0, pista - player1.PONTOS));

    const bar2 =
        "🟩".repeat(player2.PONTOS) +
        "⬜".repeat(Math.max(0, pista - player2.PONTOS));

    console.log("\n🏁 PISTA");

    console.log(
        `${player1.NOME.padEnd(10)} 🚗 ${bar1} ${"❤️".repeat(player1.VIDA)}`
    );

    console.log(
        `${player2.NOME.padEnd(10)} 🚗 ${bar2} ${"❤️".repeat(player2.VIDA)}`
    );

    console.log("");
}

module.exports = showRaceBar;