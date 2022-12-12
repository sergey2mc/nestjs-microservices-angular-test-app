import * as Joi from 'joi';

export const configSchema = Joi.object({
  // Services ports
  API_PORT: Joi.number().default(4000),
  USER_MICROSERVICE_PORT: Joi.number().default(4100),
  DOC_MICROSERVICE_PORT: Joi.number().default(4200),

  // Redis
  REDIS_HOST: Joi.string().required().default('localhost'),
  REDIS_PORT: Joi.number().required().default(6379),

  // Database
  MONGODB_HOST: Joi.string().required().default('localhost'),
  MONGODB_PORT: Joi.number().required().default(27020),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASS: Joi.string().required(),
  MONGODB_DATABASE_NAME: Joi.string().required(),
});
