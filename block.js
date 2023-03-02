const { sha256 } = require("js-sha256");
const chain = [];
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
    : chain[id - 2].currentHash;
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
    let computedHash = sha256(leftNode + rightNode);
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

console.log(chain);

function verification() {
  for (let i = 0; i < chain.length - 1; i++) {
    if (chain[i].currentHash != chain[i + 1].previousHash) {
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
  let id_num = Math.floor(Math.random() * 4);
  chain[id_num].transaction = generateTransactionHash(["Double Payment"]);
  [chain[id_num].currentHash, chain[id_num].nonce] = generateCurrentHash(
    chain[id_num].id,
    chain[id_num].timeStemp,
    chain[id_num].transaction,
    chain[id_num].previousHash
  );
}
tempereBlock();
console.log(chain);
verification();
