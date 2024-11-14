import express from "express";
import Product from "../models/productModel.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.get('/:id', getProductById)

export default router;
