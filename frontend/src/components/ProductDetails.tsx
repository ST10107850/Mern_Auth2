import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../productSlice/productApiSlice";

export const ProductDetails = () => {
  console.log("ProductDetails component is mounted"); // Add this log at the start

  const { id } = useParams();
  console.log("Product ID from URL params:", id);

  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  console.log("Fetched product data:", product);

  if (isLoading) return <div>Loading product details...</div>;
  if (error) {
    console.error("Error loading product details:", error);
    return <div>Error loading product details</div>;
  }
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col justify-center items-center py-7">
      <div className="max-w-lg border border-gray-300 rounded-lg shadow-lg p-6">
        <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-orange-500 my-4">
          {product.productName}
        </h1>
        <p className="text-gray-700 mb-4">{product.productDescription}</p>
        <p className="text-orange-500 font-bold">
          Price: R{product.productPrice}
        </p>
        <p className="text-gray-500 mt-2">Color: {product.productColor}</p>
      </div>
    </div>
  );
};
