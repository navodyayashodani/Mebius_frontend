import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/lib/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ShippingAddressForm from "@/components/ShippingAddressForm";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const SHIPPING_FEE = 50;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalPrice = subtotal + SHIPPING_FEE;

  return (
    <main className="px-4 py-8 max-w-8xl mx-12">
      <h2 className="text-4xl font-bold text-gray-800">Checkout Page</h2>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column - Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h3>
          
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  {item.product.image && (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>s
                  </div>
                </div>
                <p className="font-medium text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>${SHIPPING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Shipping Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
          <ShippingAddressForm cart={cart} />
        </div>
      </div>

      {isError && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          There was an error processing your order. Please try again.
        </div>
      )}
    </main>
  );
}

export default CheckoutPage;
