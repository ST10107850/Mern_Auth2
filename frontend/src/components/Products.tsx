import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  productColor: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-7">
      <h1 className="text-3xl text-orange-500 font-bold my-10">
        List Of All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products?.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="border border-gray-300 rounded-lg shadow-lg p-4 hover:opacity-90 max-w-xs"
          >
            <div className="w-[300px] h-[200px] flex justify-center items-center overflow-hidden">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-contain rounded-lg mb-4"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-orange-500">
              {item.productName}
            </h3>
            <p className="text-orange-300 font-bold mt-2">
              Price: R{item.productPrice}
            </p>
          </Link>
        ))}
      </div>

      <Link
        to="/product/create_product"
        className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Create New Product
      </Link>
    </div>
  );
};
