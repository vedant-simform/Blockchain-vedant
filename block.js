const { sha256 } = require("js-sha256");
const blockchain = [];
let difficulty = Math.floor(Math.random() * 4 + 1);

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
  block.id = blockchain.length + 1;
  block.timeStemp = Date().slice(16, 24);
  block.transaction = generateTransactionHash(transaction);
  block.previousHash = generatePreviousHash(block.id);
  [block.currentHash, block.nonce] = generateCurrentHash(
    block.id,
    block.timeStemp,
    block.transaction,
    block.previousHash
  );
  blockchain.push(block);
}
function generateCurrentHash(id, timeStemp, transaction, previousHash) {
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
    : blockchain[id - 2].currentHash;
}
function generateTransactionHash(transaction) {
  let output = "";
  if (transaction.length === 0) return sha256(" ");
  if (transaction.length === 1) {
    return sha256(transaction[0]);
  }
  if (transaction.length % 2 != 0) {
    transaction.push(transaction[transaction.length - 1]);
  }
  let newPair = [];
  for (let i = 0; i < transaction.length; i += 2) {
    let leftNode = transaction[i];
    let rightNode = transaction[i + 1];
    let computedHash = sha256(sha256(leftNode) + sha256(rightNode));
    newPair.push(computedHash);
  }
  output = generateTransactionHash(newPair);
  return output;
}

addingBlock([
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Raj to Raj => 65$",
  "Transaction :- Vedant to Raj => 75$",
  "Transaction :- Soni to Raj => 550$",
  "Transaction :- Vedant to Raj => 59$",
]);

addingBlock([
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Raj to Raj => 65$",
  "Transaction :- Vedant to Raj => 15$",
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Vedant to Raj => 50$",
]);
addingBlock([
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Raj to Raj => 65$",
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Vedant to Raj => 5$",
]);
addingBlock([
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Raj to Raj => 65$",
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Vedant to Raj => 50$",
  "Transaction :- Vedant to Raj => 53$",
]);

console.log(blockchain);

function verification() {
  for (let i = 0; i < blockchain.length - 1; i++) {
    if (blockchain[i].currentHash != blockchain[i + 1].previousHash) {
      console.log("Block is tempered");
      break;
    } else {
      console.log("Block mining is successfull ===>>");
    }
  }
}
verification();
console.log("After tempering random Block");
function tempereBlock() {
  let blockID = Math.floor(Math.random() * 4);
  blockchain[blockID].transaction = generateTransactionHash(["Double Payment"]);
  [blockchain[blockID].currentHash, blockchain[blockID].nonce] =
    generateCurrentHash(
      blockchain[blockID].id,
      blockchain[blockID].timeStemp,
      blockchain[blockID].transaction,
      blockchain[blockID].previousHash
    );
}
tempereBlock();
console.log(blockchain);
verification();
