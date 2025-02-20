import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useEffect, useState } from "react";
import { Skeleton } from "./components/ui/skeleton";
import { useGetProductsQuery, useGetCategoriesQuery } from "./lib/api";

function Products(props) {
  /*const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState({isError: false, message: ""});*/

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
  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

    const handleTabClick = (_id) => {
        setSelectedCategoryId(_id)
    }

    

    

    /*useEffect(()=> {
      //console.log("useEffect")
      getProducts().then((data) => {
        setProducts(data);
      }).catch((error) => {
        //console.log(error);
        setProductsError({isError:true, message: error.message});
      }).finally(()=> setIsProductsLoading(false));
    }, []);*/

    if(isProductsLoading || isCategoriesLoading){
      return(
        <section className="px-14 py-8">
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

    if(isProductsError || isCategoriesError){
      return(
        <section className="px-14 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
        </div>
        <div className="mt-4">
        <p className="text-red-500">{`${productsError.message} ${categoriesError.message}`}</p>
        </div>
      </section>
      )
    }

  return (
    <section className="px-14 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      {/*<div>
        <Button onClick={() => getProducts()}>GET Products</Button>
      </div>*/}
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center gap-4">
      {[...categories, { _id: "ALL", name: "All" }].map((category) => (
          <Tab
            key={category._id}  
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}
      </div>
      <ProductCards products={filteredProducts} />
    </section>
  );
}

export default Products;