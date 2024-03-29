const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    // for (let i=1; i<chain.length; i++) {
    //   const block = chain[i];
    //   const lastBlock = chain[i-1];

    //   if (block.lastHash !== lastBlock.hash ||
    //       block.hash !== Block.blockHash(block)) {
    //     return false;
    //   }
    // }
    for (let i=1; i<chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
      const actualLastHash = chain[i-1].hash;
      // console.log(`hash : ${lastHash}`);
      // console.log(`hash : ${actualLastHash}`);
      if (lastHash !== actualLastHash) return false;
    }
    return true;
  }

  replaceChain(newChain) {
    // if (newChain.length <= this.chain.length) {
    //   console.log('Received chain is not longer than the current chain.');
    //   return;
    // } else 
    if (!this.isValidChain(newChain)) {
      console.log('The received chain is not valid.');
      return;
    }
    console.log('Valid Chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;