import config from '../config/config';
import { CONTRACT_ABI } from '../config/abi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const { contract, provider } = config;

const providerWSS = new Web3.providers.WebsocketProvider(provider.endpoints.wss);
const web3WSS = new Web3(providerWSS);

export const contractWSS = new web3WSS.eth.Contract(CONTRACT_ABI, contract.address);

export const checkBalanceByAddress = async (address: string): Promise<void> => {
  await web3WSS.eth.getBalance(address).then((balance: string) => {
    console.log(`Balance ${ address } = ${ balance }`);
  });
};
