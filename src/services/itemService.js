const items = require("../data/items");

async function getRandomItem() {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
module.exports = getRandomItem;