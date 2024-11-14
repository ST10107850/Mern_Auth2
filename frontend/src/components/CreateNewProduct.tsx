import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../types/State";
import { setCredentials } from "../slices/authSlice";
import { useCreateProductMutation } from "../productSlice/productApiSlice";

export const CreateNewProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productColor, setProductColor] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProduct] = useCreateProductMutation();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate, userInfo]);

  // Convert the uploaded file to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createProduct({
        productName,
        productPrice,
        productImage, // Now includes the Base64-encoded image
        productDescription,
        productColor,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Product Created successfully!");
      navigate("/product"); // Navigate to product list after successful creation
    } catch (err: any) {
      toast.error(err?.data?.message || err.error || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#FCF7F2] py-8 px-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-orange-400 uppercase text-3xl font-bold text-center mb-6">
          Create New Product
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Product name"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Product price"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Product Description
            </label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Product description"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {productImage && (
              <img
                src={productImage}
                alt="Product Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Product Color
            </label>
            <input
              type="text"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Product color"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              Create Product
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Want to go back?{" "}
            <Link to="/product" className="text-orange-500 font-semibold">
              View Products
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
