import { Separator } from "@/components/ui/separator";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCards from "./ProductCards";
import Tab from "./Tab";

function Products() {
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

  // Filter products by category
  const filteredProducts = selectedCategoryId === "ALL"
    ? products
    : products?.filter((product) => product.categoryId._id === selectedCategoryId);

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4"></div>
        <div className="mt-4">
          <p className="text-red-500">Error fetching products or categories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 mx-6">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center gap-4">
        {/* Move "All" to the beginning of the array */}
        <Tab
          key="ALL"
          _id="ALL"
          selectedCategoryId={selectedCategoryId}
          name="All"
          onTabClick={handleTabClick}
        />
        {categories?.map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}
      </div>
      <div className="mt-8">
        <ProductCards products={filteredProducts || []} />
      </div>
    </section>
  );
}

export default Products;