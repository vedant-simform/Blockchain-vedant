const { sha256 } = require("js-sha256");
console.log("Starting Mining...");
const chain = [];
// Adding new block into blockchain
function addingBlock(transaction) {
  const block = {
    id: "",
    nonce: "",
    timeStemp: "",
    transaction: "",
    previousHash: "",
    currentHash: "",
  };
  block.id = chain.length + 1;
  block.timeStemp = Date().slice(16, 24);
  block.transaction = generateTransactionHash(transaction);
  block.previousHash = generatePreviousHash(block.id);
  [block.currentHash, block.nonce] = generateCurrentHash(
    block.id,
    block.timeStemp,
    block.transaction,
    block.previousHash
  );
  chain.push(block);
}

//Generate Difficulty
function generateNonceDifficulty() {
  return Math.floor(Math.random() * 4);
}

function generateCurrentHash(id, timeStemp, transaction, previousHash) {
  let difficulty = generateNonceDifficulty();
  let tempNonce = 0;
  while (
    sha256("" + id + tempNonce + timeStemp + transaction + previousHash).slice(
      0,
      difficulty
    ) != Array(difficulty + 1).join("0")
  ) {
    tempNonce++;
  }
  return [
    sha256("" + id + tempNonce + timeStemp + transaction + previousHash),
    tempNonce,
  ];
}
function generatePreviousHash(id) {
  return id == 1
    ? "0000000000000000000000000000000000000000000000000000000000000000"
    : chain[id - 2].currentHash;
}
function generateTransactionHash(transaction) {
  return sha256(transaction);
}

addingBlock("Transaction :- Vedant to Raj => 50$");
addingBlock("Transaction :- Raj to Raj => 65$");
addingBlock("Transaction :- Raj to Vedant => 30$");
addingBlock("Transaction :- Vedant to Raj => 75$");
console.log(chain);
console.log("Mining Completed...");
