import * as Joi from 'joi';

const tokenAddressValidation = Joi.string().required();
const amountValidation = Joi.number().required();
const userAddressValidation = Joi.string().required();
const tokenInfoTypeValidation = Joi.string().required();

const defaultPayloadSchema = Joi.object({
  tokenAddress: tokenAddressValidation,
  amount: amountValidation,
  userAddress: userAddressValidation
});

export const approvePayload = Joi.object({
  ...defaultPayloadSchema
});

export const depositPayload = Joi.object({
  ...defaultPayloadSchema
});

export const withdrawPayload = Joi.object({
  ...defaultPayloadSchema
});

export const getTokenInfoParams = Joi.object({
  tokenAddress: tokenAddressValidation,
  type: tokenInfoTypeValidation
});
