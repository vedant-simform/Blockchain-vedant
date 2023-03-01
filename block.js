const { sha256 } = require("js-sha256");

const chain = [];
function createBlockchain(nonce, transaction, id = chain.length + 1) {
  const block = {
    id: "",
    nonce: "",
    transaction: "",
    previousHash: "",
    currentHash: "",
  };
  block.id = id;
  block.nonce = nonce;
  block.transaction = transaction;
  block.previousHash = previosHashGenerate(id);
  block.currentHash = currentHashGenerate(
    block.id,
    block.nonce,
    block.transaction,
    block.previousHash
  );
  chain.push(block);
}

function currentHashGenerate(id, nonce, transaction, previousHash) {
  return sha256("" + id + nonce + transaction + previousHash);
}
function previosHashGenerate(id) {
  if (id == 1) {
    return "0000000000000000000000000000000000000000000000000000000000000000";
  } else {
    return chain[id - 2].currentHash;
  }
}
function transactionGenerate() {}

createBlockchain(2056, "Transaction :- Vedant to Raj => 50$");
createBlockchain(1906, "Transaction :- Raj to Raj => 65$");
createBlockchain(3003, "Transaction :- Raj to Vedant => 30$");
createBlockchain(7510, "Transaction :- Vedant to Raj => 75$");
console.log(chain);
