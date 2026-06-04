async function logRollResult(character, skill, dice, attribute){
    console.log( `${character.NOME} 🎲 rolou ${dice} + ${attribute} = ${
      dice + attribute
    }`);
}

module.exports = logRollResult;