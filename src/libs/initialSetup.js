/*
  fn de creacion de roles por defecto
*/

import Role from "../models/Role";

export const createRoles = async () => {
  try {
    //  comprobación de existencia de roles
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return; //corta el proceso

    // generamos una promesa multiple para ganar rendimiento
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
