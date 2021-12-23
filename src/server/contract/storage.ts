import { CONTRACT_ABI, TOKEN_ABI_ERC20 } from '../config/abi';
import config from '../config/config';
import { Contract } from 'web3-eth-contract';
import { Account, WebsocketProvider } from 'web3-core';

const { stockExchange, tokens, provider } = config;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const web3 = require('web3');

let instance: ContractStorage;

export class ContractStorage {
  provider: WebsocketProvider;
  web3: any;
  stockExchangeContract: Contract;
  tokenContracts: Map<string, Contract>;
  tokenList: string[]
  account: Account

  static getInstance: () => ContractStorage;

  constructor() {
    this.provider = new web3.providers.WebsocketProvider(provider.endpoints.wss);
  }

  init(): ContractStorage {
    if (this.stockExchangeContract) {
      return this;
    }

    try {
      this.web3 = new web3(this.provider);
      this.stockExchangeContract = new this.web3.eth.Contract(CONTRACT_ABI, stockExchange.address);
      this.tokenContracts = new Map<string, Contract>();
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

  getTokenContract(address: string): Contract {
    let contract = this.tokenContracts.get(address);

    if (!contract) {
      contract = new this.web3.eth.Contract(TOKEN_ABI_ERC20, address);
      this.tokenContracts.set(address, contract);
    }
    return contract;
  }

  async getTokenList(): Promise<string[]> {
    if (!this.tokenList) {
      this.tokenList = await this.stockExchangeContract.methods['getListTokens']().call();
    }
    return this.tokenList;
  }

  async getGasPrice(): Promise<number> {
    return await this.web3.eth.getGasPrice();
  }

  addAccount(): Account {
    if (!this.account) {
      this.account = this.web3.eth.accounts.privateKeyToAccount(config.stockExchange.defaultPrivateKey);
      this.web3.eth.accounts.wallet.add(this.account);
    }
    return this.account;
  }
}

ContractStorage.getInstance = function(): ContractStorage {
  if (!instance) {
    const contract = new ContractStorage();
    instance = contract.init();
  }

  return instance;
};
