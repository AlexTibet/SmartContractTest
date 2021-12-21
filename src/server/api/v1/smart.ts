import { output, error, ResponseData } from '../../utils';
import { ContractStorage } from '../../contract/ContractStorage';

export const approve = async (r): Promise<ResponseData> => {
  try {
    return output({ message: 'approve' });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const deposit = async (r): Promise<ResponseData> => {
  try {
    return output({ message: 'deposit' });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const getTokens = async (r): Promise<ResponseData> => {
  try {
    const contractStorage = ContractStorage.getInstance();
    const tokenList = await contractStorage.getTokenList();

    return output({ tokenList });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const getTokenInfo = async (r): Promise<ResponseData> => {
  try {
    const { tokenAddress, type } = r.params;
    const contractStorage = ContractStorage.getInstance();
    const contract = contractStorage.getTokenContract(tokenAddress);
    const result = await contract.methods[type]().call();

    return output({ result });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const withdraw = async (r): Promise<ResponseData> => {
  try {
    return output({ message: 'withdraw' });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};
