import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutForm from "@/components/CheckoutForm"; 
import { useAuth } from "@clerk/clerk-react";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value); // Access the cart from Redux state
  const location = useLocation(); // Access the current location object
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth(); // Authentication check
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Track if auth is checked

  const SHIPPING_FEE = 50;

  // Calculate subtotal and total price
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalPrice = subtotal + SHIPPING_FEE;

  // Extract the shipping address from location state (if available)
  const shippingAddress = location.state?.shippingAddress;

  const handlePlaceOrder = () => {
    dispatch(clearCart()); // Clear the cart after placing the order
    toast.success("Order Placed Successfully");
    navigate("/shop/complete"); // Navigate to the order completion page
  };

  // Check authentication status
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate('/sign-in', { replace: true }); // Redirect to sign-in if not authenticated
      } else {
        setIsAuthChecked(true); // Auth check is complete
      }
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Show loading state until auth status is determined
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="px-4 py-8 max-w-7xl mx-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Review Your Order</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="divide-y">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="py-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price} each
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-6">Payment Details</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${SHIPPING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* <div className="mt-4">
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </div> */}
        </div>
      </div>

      

      {/* Optional: Display Shipping Address */}
      {shippingAddress && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>{shippingAddress.line_1}</p>
            <p>{shippingAddress.line_2}</p>
            <p>{shippingAddress.city}, {shippingAddress.state}</p>
            <p>{shippingAddress.zip_code}</p>
            <p>{shippingAddress.phone}</p>
          </div>
        </div>
      )}

      {/* Checkout Form Section */}
      <div className="mt-4">
        <CheckoutForm cartItems={cart}/>
      </div>
    </main>
  );
}

export default PaymentPage;
