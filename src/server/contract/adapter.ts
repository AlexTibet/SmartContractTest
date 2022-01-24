import { Contract } from 'web3-eth-contract';
import { ContractStorage } from './storage';
import { BigNumber } from 'bignumber.js';
import { Account } from 'web3-core';
import config from '../config/config';

export enum TOKEN_INFO_METHODS {
  'name',
  'decimals',
  'symbol',
  'totalSupply'
}


export class ContractAdapter {
  private contractStorage: ContractStorage
  private contract: Contract
  private account: Account

  constructor() {
    this.contractStorage = ContractStorage.getInstance();
    this.account = this.contractStorage.addAccount();
  }

  private async send(method: string, args?: Array<string | BigNumber>): Promise<undefined> {
    const gasPrice = await this.contractStorage.getGasPrice();
    const gasEstimate = await this.contract.methods[method](...args).estimateGas({
      from: this.account.address
    });
    const gas = new BigNumber(gasEstimate).multipliedBy(1.5).toFixed(0);

    return await this.contract.methods[method](...args).send({
      from: this.account.address,
      gasPrice,
      gas
    });
  }

  async getTokens(): Promise<string[]> {
    return await this.contractStorage.getTokenList();
  }

  async checkTokenAvailable(token): Promise<boolean> {
    const availableTokens = await this.getTokens();
    return availableTokens.includes(token);
  }

  async getTokenInfo(tokenAddress: string, method: keyof typeof TOKEN_INFO_METHODS): Promise<undefined> {
    this.contract = this.contractStorage.getTokenContract(tokenAddress);
    return await this.contract.methods[method]().call();
  }

  async approve(tokenAddress, amount, userAddress): Promise<undefined> {
    console.log(tokenAddress, amount, userAddress);
    this.contract = this.contractStorage.getTokenContract(tokenAddress);
    return await this.send('approve', [config.stockExchange.address, new BigNumber(amount)]);
  }

  async deposit(tokenAddress, amount, userAddress): Promise<undefined> {
    this.contract = this.contractStorage.getStockExchangeContract();
    return await this.send('deposit', [new BigNumber(amount), tokenAddress]);
  }

  async withdraw(tokenAddress, amount, userAddress): Promise<undefined> {
    console.log(tokenAddress, amount, userAddress);
    this.contract = this.contractStorage.getStockExchangeContract();
    return await this.send('withdraw', [new BigNumber(amount), tokenAddress]);
  }
}
