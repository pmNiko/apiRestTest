import mongoose from "mongoose";

// fn conexion a la BD
export async function connect() {
  await mongoose
    .connect("mongodb://localhost/apiProductsDev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => console.log(">>>> db is connected!"))
    .catch((err) => console.log("Error: ", err));
}
