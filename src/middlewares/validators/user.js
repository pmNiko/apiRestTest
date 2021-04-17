import * as user from "../../schema/userSchema";

export const create = (req, res, next) => {
  const { error } = user.create.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
