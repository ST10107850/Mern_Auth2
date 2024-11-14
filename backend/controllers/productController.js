import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(async (req, res) => {
  const product = req.body;

  console.log("Received product data:", product); // Log the product data

  if (
    !product.productName?.trim() ||
    !product.productPrice ||
    isNaN(parseFloat(product.productPrice)) ||
    !product.productDescription?.trim() ||
    !product.productImage?.trim() ||
    !product.productColor?.trim()
  ) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in create product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getAllProduct = await Product.find({});
    res.status(201).json(getAllProduct);
  } catch (error) {
    console.error("Error fetching clothes:", error);
    res.status(404).json({ success: false, message: "No data found" });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await Product.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: `Item: ${deleteItem} has been deleted successully....`,
    });
  } catch (error) {
    console.log("Error: ", error, message);

    res.status(404);
    throw new Error("Fail to delete product: ", error.message);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedClothingData = req.body;

  try {
    const updatedClothing = await Product.findByIdAndUpdate(
      id,
      updatedClothingData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedClothing,
    });
  } catch (error) {
    console.error("Error updating clothing item:", error);
    res
      .status(404)
      .json({ success: false, message: "No item with that ID found" });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const productItem = await Product.findById(id);

    if (!productItem) {
      return res
        .status(404)
        .json({ success: false, message: "No product found for that ID" });
    }

    res.status(200).json({
      success: true,
      message: `Product found for ID: ${id}`,
      data: productItem,
    });
  } catch (error) {
    console.error("Error fetching product item:", error);
    res
      .status(500)
      .json({ success: false, message: "No product found for that ID" });
  }
});
