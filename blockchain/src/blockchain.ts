import { DigestGenerator } from "./types/index";
import { BrowserCryptoGenerator } from "./cripto";

export class Block {
  hash: string = "UNINITIALIZED";
  previousHash: string;
  timeStamp: Date;
  data: unknown;
  generator: DigestGenerator;

  constructor(previousHash: string, data: unknown, generator: DigestGenerator) {
    this.data = data;
    this.timeStamp = new Date();
    this.previousHash = previousHash;
    this.generator = generator;
  }

  async init() {
    this.hash = await this.calculateHash();

    return this;
  }

  calculateHash() {
    const stringifiedData = JSON.stringify(this.data);

    const compositeData = `${this.timeStamp}${this.previousHash}${stringifiedData}`;

    const encodedData = this.generator.encode(compositeData);

    return this.generator.digest(encodedData);
  }
}

export class BlockService {
  createBlock(previousHash: string, data: unknown) {
    const generator = new BrowserCryptoGenerator();
    return new Block(previousHash, data, generator).init();
  }
}

export class Blockchain {
  chain: Block[] = [];
  isLoggingEnabled: boolean;

  constructor({ log }: { log?: boolean }) {
    this.isLoggingEnabled = Boolean(log);
  }

  _createGenesis() {
    return new BlockService().createBlock("0", "This is genesis");
  }

  _getLatest() {
    return this.chain[this.chain.length - 1];
  }

  async init() {
    this.chain = [await this._createGenesis()];

    if (this.isLoggingEnabled) console.log("GenesisBlock created");

    return this;
  }

  async add(data: unknown) {
    const latest = this._getLatest();

    const nextBlock = await new BlockService().createBlock(latest.hash, data);

    this.chain.push(nextBlock);

    if (this.isLoggingEnabled) console.log("New Block added");

    return nextBlock;
  }

  async isValid() {
    let isChainValid = true;

    for await (let [index, currentBlock] of this.chain.entries()) {
      const previousBlock = this.chain[index - 1];
      const recalculatedHash = await currentBlock.calculateHash();

      if (currentBlock.hash !== recalculatedHash) {
        isChainValid = false;
      }
      if (index && currentBlock.previousHash !== previousBlock.hash) {
        isChainValid = false;
      }
    }

    return isChainValid;
  }
}
