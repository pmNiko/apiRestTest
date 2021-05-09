/*
  controller de roles
*/

import Role from "../models/Role";

export const getRoles = async (req, res) => {
  Role.find({}).exec((error, roles) => {
    if (error)
      return res.status(500).send({
        message: "Internal server error.",
      });

    res.status(200).json({ data: roles });
  });
};
