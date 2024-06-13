import slugify from "slugify";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import multer from "multer";

//POST create product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    productName,
    image,
    category,
    price,
    description,
    inStock,
    trending,
    coffeeData,
    machineData,
    cupData
  } = req.body;
  req.body.slug = slugify(productName);

  try {
    const newProduct = await Product.create({
      title,
      productName,
      image,
      category,
      price,
      description,
      inStock,
      trending,
      coffeeData,
      cupData,
      machineData,
      slug: req.body.slug,
    });
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
});
 

//GET get all products
export const getProducts = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  const keys = Object.keys(queryObj);
  if (keys.length === 0) {
    const products = await Product.find();
    res.status(200).json(products);
  } else { 
    let newObj = {}; 
    keys.map((item) => {
      if (item === "price") {
        newObj[item] = queryObj[item];
      } else if (item === "size") {
        newObj["quantity"] = queryObj[item].split(",");
      } else {
        newObj[item] = queryObj[item].split(",");
      }
    });

    keys.forEach((item) => {
      if (queryObj[item] === "") {
        delete newObj[item];
      }
    });
    //Filtering
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete newObj[el]);
    let queryStr = JSON.stringify(newObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const parsedQueries = JSON.parse(queryStr);

    let query = Product.find(parsedQueries);

    //Sorting
    if (req.query.sort === "cheapest") {
      query.sort("price");
    } else if (req.query.sort === "most expensive") {
      query.sort("-price");
    } else {
      query.sort("-createdAt");
    }

    const product = await query;
    res.status(200).json(product);
  }
});

//GET get product
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findOne({ slug: id });
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});