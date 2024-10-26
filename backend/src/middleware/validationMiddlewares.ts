import { celebrate, Joi, Segments } from "celebrate";

export const validationProduct = celebrate({
  [Segments.BODY]: Joi.object({
    description: Joi.string(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required()
    }).required(),
    title: Joi.string().min(2).max(30).required(),
    category: Joi.string().required(),
    price: Joi.number().allow(null)
  })
})

export const validationOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().required()
  })
})