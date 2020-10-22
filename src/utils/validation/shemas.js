const Joi = require('joi');
const UUID_VERSION = 'uuidv4';

const schemas = {
  taskId: Joi.object({
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required(),
    taskId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  }),
  id: Joi.object({
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  }),
  userBody: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    login: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  }).options({ abortEarly: false, allowUnknown: true })
};

module.exports = schemas;
