import { output, error, ResponseData } from '../../utils';
import { ContractAdapter } from '../../contract/adapter';

export const approve = async (r): Promise<ResponseData> => {
  try {
    const { tokenAddress, amount, userAddress } = r.payload;
    const contract = new ContractAdapter();
    const result = await contract.approve(tokenAddress, amount, userAddress);

    return output({ result });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const deposit = async (r): Promise<ResponseData> => {
  try {
    const { tokenAddress, amount, userAddress } = r.payload;
    const contract = new ContractAdapter();
    const result = await contract.deposit(tokenAddress, amount, userAddress);

    return output({ result });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const getTokens = async (r): Promise<ResponseData> => {
  try {
    const contract = new ContractAdapter();
    const tokenList = await contract.getTokens();

    return output({ tokenList });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const getTokenInfo = async (r): Promise<ResponseData> => {
  try {
    const { tokenAddress, method } = r.params;
    const contract = new ContractAdapter();
    const result = await contract.getTokenInfo(tokenAddress, method);

    return output({ result });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const withdraw = async (r): Promise<ResponseData> => {
  try {
    const { tokenAddress, amount, userAddress } = r.payload;
    const contract = new ContractAdapter();
    const result = await contract.withdraw(tokenAddress, amount, userAddress);

    return output({ result });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};
