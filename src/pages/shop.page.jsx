import { useGetProductsQuery, useGetCategoriesQuery } from "@/lib/api";
import ProductCards from "@/ProductCards";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

function ShopPage() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("none");

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <main className="min-h-screen px-8 py-4">
            <p className="text-red-500">{`${productsError?.message} ${categoriesError?.message}`}</p>
      </main>
    );
  }

  // Filter products by category
  const filteredProducts = selectedCategoryId === "ALL"
    ? products
    : products.filter((product) => product.categoryId === selectedCategoryId);

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Title Section - Centered */}
      <div className="text-center w-full py-8">
        <h2 className="text-4xl font-bold">Products</h2>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              
              
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {[...categories, { _id: "ALL", name: "All" }].map((category) => (
                    <SelectItem 
                      key={category._id} 
                      value={category._id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Sort */}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {sortedProducts.length > 0 ? (
          <ProductCards products={sortedProducts} />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm ">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ShopPage;