import * as Joi from 'joi';

export const exampleValidateSchema = Joi.object({
  exampleParam: Joi.string().required()
});
