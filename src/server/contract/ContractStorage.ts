import { CONTRACT_ABI, TOKEN_ABI_ERC20 } from '../config/abi';
import config from '../config/config';
import { Contract } from 'web3-eth-contract';
import { WebsocketProvider } from 'web3-core';

const { stockExchange, tokens, provider } = config;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const web3 = require('web3');

let instance: ContractStorage;

export class ContractStorage {
  provider: WebsocketProvider;
  web3: any;
  stockExchangeContract: Contract;
  tokenContract: Contract;

  static getInstance: () => ContractStorage;

  constructor() {
    this.provider = new web3.providers.WebsocketProvider(provider.endpoints.wss);
  }

  init(): ContractStorage {
    if (this.tokenContract && this.stockExchangeContract) {
      return this;
    }

    try {
      this.web3 = new web3(this.provider);
      this.stockExchangeContract = new this.web3.eth.Contract(CONTRACT_ABI, stockExchange.address);
      this.tokenContract = new this.web3.eth.Contract(TOKEN_ABI_ERC20, tokens.address);
    } catch (err) {
      console.log(err);

      console.log('Manual process exit');
      process.exit(1);
    }

    return this;
  }

  getStockExchangeContract(): Contract {
    return this.stockExchangeContract;
  }

  getTokenContract(): Contract {
    return this.tokenContract;
  }
}

ContractStorage.getInstance = function(): ContractStorage {
  if (!instance) {
    const contract = new ContractStorage();
    instance = contract.init();
  }

  return instance;
};
