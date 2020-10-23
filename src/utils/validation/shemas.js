const Joi = require('joi');

const schemas = {
  taskId: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    taskId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  }),
  id: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  }),
  taskBody: Joi.object({
    title: Joi.string().required(),
    order: Joi.number()
      .integer()
      .required(),
    description: Joi.string().allow(null),
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .allow(null),
    boardId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .allow(null),
    columnId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
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
