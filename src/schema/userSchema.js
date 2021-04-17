import Joi from "joi";

// schema validación de creacion de usuarios
export const create = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array().items(Joi.string().valid("admin", "moderator")),
});
