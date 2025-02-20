import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  return (
    <Link to={`/shop/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">{product.category}</span>
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard; 