/*
  Modelo de producto
*/
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: String,
      default: "Generico",
      trim: true,
    },
    price: Number,
    imgURL: String,
    dataFake: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);
