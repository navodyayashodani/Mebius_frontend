import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const SHIPPING_FEE = 50;
    const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const totalPrice = subtotal + SHIPPING_FEE;

    const handlePlaceOrder = () => {
        dispatch(clearCart());
        toast.success("Order Placed Successfully");
        navigate("/shop/complete");
    };

    return (
        <main className="px-4 py-8 max-w-7xl mx-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Review Your Order</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    
                    <div className="divide-y">
                        {cart.map((item, index) => (
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
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-gray-500">
                                            ${item.product.price} each
                                        </p>
                                                                                        
                                    </div>
                                </div>
                                <p className="font-medium">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary - Takes 1 column */}
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

                    <Button 
                         onClick={() => {
                            dispatch(clearCart());
                            
                          }}
                        className="w-full py-6 text-lg font-semibold"
                    >
                        Pay ${totalPrice.toFixed(2)}
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default PaymentPage;