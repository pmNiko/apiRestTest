/*
  Controller de Products
*/
import faker from "faker";
faker.locale = "es";
import Product from "../models/Product";

// fn para crear productos
export const createProduct = async (req, res) => {
  // destructuring
  const { name, category, price, imgURL } = req.body;

  const product = new Product({
    name,
    category,
    price,
    imgURL,
  });

  product.save((error, product) => {
    resServer(res, error, product);
  });
};

// fn para generar datos falsos a travez de faker
export const generateDataFake = async (req, res) => {
  const categories = [
    "categoria1",
    "categoria2",
    "categoria3",
    "categoria4",
    "categoria5",
  ];

  for (let i = 0; i < 50; i++) {
    const product = new Product();
    product.name = faker.commerce.product();
    product.category =
      categories[Math.floor(Math.random() * categories.length)];
    product.price = faker.finance.amount();
    product.imgURL = faker.image.technics();
    try {
      await product.save();
    } catch (error) {
      console.log(error);
    }
  }
  res.status(201).json({ message: "Data fake insert" });
};

// get products per page
export const getProductsPerPage = async (req, res) => {
  let { category, limit } = req.query;

  const conditions = category && { category };

  const page = parseInt(req.params.number) || 0;

  limit = limit && limit > 0 ? parseInt(limit) : 0;

  const skip = page > 0 ? limit * page - limit : 0; //example 2 * 1 = 2 ; 2-2= 0; // in the first page the value of the skip is 0

  search({ conditions, skip, limit, res });
};

// fn para obtener productos
export const getProducts = async (req, res) => {
  let { name, category, sort, skip, limit } = req.query;

  const conditions = (name && { name }) || (category && { category });
  sort = sort === "asc" ? { _id: 1 } : { _id: -1 };
  skip = skip && parseInt(skip);
  limit = limit && parseInt(limit);

  search({ conditions, sort, skip, limit, res });
};

// fn modular de busqueda
const search = async ({
  conditions = {},
  sort = {},
  skip = 0,
  limit = 10,
  res,
}) => {
  Product.find(conditions)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec((error, products) => {
      resServer(res, error, products);
    });
};

// fn para obtener productos por ID
export const getProductById = async (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    resServer(res, error, product);
  });
};

// fn para actualizar productos
export const updateProductById = async (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, product) => {
      resServer(res, error, product);
    }
  );
};

// fn para borrar productos
export const deleteProductById = async (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, product) => {
    if (error)
      return res.status(500).send({
        message: "500 internal server error.",
      });

    if (!product) return res.status(404).send({ message: "404 not found." });

    res.json(true);
  });
};

// delete data fake
export const deleteDataFake = (req, res) => {
  Product.deleteMany({}, (error, products) => {
    resServer(res, error, products);
  });
};

/*
    Esta función abstrae la respuesta del servidor
  */
function resServer(res, error, resource) {
  if (error)
    return res.status(500).send({
      message: "Internal server error.",
    });
  if (!resource)
    return res.status(404).send({
      message: "404 not found.",
    });

  res.status(200).json({ data: resource });
}
