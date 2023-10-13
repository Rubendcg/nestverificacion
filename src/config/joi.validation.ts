import * as Joi from 'joi';

export const JoiValidationShema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3004),
    DEFAUL_LIMIT: Joi.number().default(1)
})
