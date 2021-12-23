import * as Joi from 'joi';
import { TokenInfoMethods, ContractAdapter } from '../contract/adapter';

const tokenAddressValidation = Joi.string().required();
const amountValidation = Joi.number().unsafe().positive().required();
const userAddressValidation = Joi.string().regex(/^(0x)?[0-9a-fA-F]{40}$/).required();
const tokenInfoTypeValidation = Joi.string().valid(...Object.keys(TokenInfoMethods)).required();

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
  method: tokenInfoTypeValidation
}).label('Info about token');
