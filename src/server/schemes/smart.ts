import * as Joi from 'joi';

const tokenAddressValidation = Joi.string().required();
const amountValidation = Joi.number().required();
const userAddressValidation = Joi.string().required();
const tokenInfoTypeValidation = Joi.string().required();

const defaultPayloadSchema = {
  tokenAddress: tokenAddressValidation,
  amount: amountValidation,
  userAddress: userAddressValidation
};

export const approvePayload = Joi.object({
  ...defaultPayloadSchema
}).label('approve');

export const depositPayload = Joi.object({
  ...defaultPayloadSchema
}).label('deposit');

export const withdrawPayload = Joi.object({
  ...defaultPayloadSchema
}).label('withdraw');

export const getTokenInfoParams = Joi.object({
  tokenAddress: tokenAddressValidation,
  type: tokenInfoTypeValidation
}).label('Info about token');
