import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

//POST create category
export const createCategory = asyncHandler(async (req, res) => {
  const { title, subCategory } = req.body;
console.log(req.body)
  try {
    const newCategory = await Category.create({
      title,
      subCategory, 
    });
    res.json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// GET get all category
export const getCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find();
  res.status(200).json(allCategories);
});

// //GET get product
// export const getProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const findProduct = await Product.findOne({ slug: id });
//     res.json(findProduct);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
