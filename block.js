const { sha256 } = require("js-sha256");

const chain = [];
function createBlockchain(nonce, transaction, id = chain.length + 1) {
  const block = {
    id: id,
    nonce: nonce,
    transaction: transaction,
    previousHash: previosHashGenerate(id),
    currentHash: currentHashGenerate(id, nonce, transaction, this.previousHash),
  };

  chain.push(block);
}

function currentHashGenerate(id, nonce, transaction, previousHash) {
  return sha256("" + id + nonce + transaction + previousHash);
}
function previosHashGenerate(id) {
  if (id == 1) {
    return "0000000000000000000000000000000000000000000000000000000000000000";
  } else {
    console.log(id);
    console.log(chain[id - 1]);
    return "hello";
    // return chain[id - 1].currentHash;
  }
}
function transactionGenerate() {}

createBlockchain(10, 20);
createBlockchain();
createBlockchain();
createBlockchain();
console.log(chain);
