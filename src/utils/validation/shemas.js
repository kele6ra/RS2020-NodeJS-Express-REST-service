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
  taskBody: Joi.object({
    title: Joi.string().required(),
    order: Joi.number()
      .integer()
      .required(),
    description: Joi.string().allow(null),
    userId: Joi.string()
      .guid({ version: UUID_VERSION })
      .allow(null),
    boardId: Joi.string()
      .guid({ version: UUID_VERSION })
      .allow(null)
      .required(),
    columnId: Joi.string()
      .guid({ version: UUID_VERSION })
      .allow(null)
  }).options({ abortEarly: true, allowUnknown: true }),
  boardBody: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array()
      .items(
        Joi.object({
          title: Joi.string(),
          order: Joi.number().integer()
        })
      )
      .required()
  }).options({ abortEarly: true, allowUnknown: true }),
  userBody: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    login: Joi.string()
      .min(3)
      .max(30),
    password: Joi.string()
      .min(3)
      .max(30)
  }).options({ abortEarly: true, allowUnknown: true })
};

module.exports = schemas;
