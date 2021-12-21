import { output, error, ResponseData } from '../../utils';

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
    return output({ message: 'getTokens' });
  } catch (err) {
    console.log(err);
    return error(500000, 'Internal Server Error', {});
  }
};

export const getTokenInfo = async (r): Promise<ResponseData> => {
  try {
    return output({ message: 'getTokenInfo' });
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
