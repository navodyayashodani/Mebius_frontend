import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Loader2, ShoppingCart, ArrowLeft, Star, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ProductDetailsPage() {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading product details...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image Section */}
            <div className="md:w-1/2 p-8 bg-gray-50">
              <div className="aspect-square rounded-lg overflow-hidden bg-white p-4 border border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <div className="flex-grow">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {product.category}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(4.0 Rating)</span>
                </div>
                
                {/* Price */}
                <div className="mb-8">
                  <p className="text-4xl font-bold text-primary">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Free shipping on orders over $100
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || "No description available."}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>2 Year Warranty</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button - Updated to match ProductCard */}
              <Button 
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-6 text-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage; 