import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, MapPin, Phone, Loader } from "lucide-react";
import { useState, useEffect } from "react";

function CompletePage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id"); // Get order ID from URL
    const navigate = useNavigate(); // To redirect if needed

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!orderId) {
            setError("No order ID provided");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8000/api/orders/${orderId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }
                return response.json();
            })
            .then((data) => {
                setOrder(data);
                if (data.paymentStatus !== "paid") {
                    setError("Payment not completed yet");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [orderId]);

    // Handle cases where no order ID is provided
    if (!orderId) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Order Not Found</h2>
                    <p className="mt-4 text-gray-600">No order ID was provided.</p>
                    <Button asChild>
                        <Link to="/shop">Return to Shop</Link>
                    </Button>
                </div>
            </main>
        );
    }

    // Show loading spinner while fetching order
    if (loading) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center">
                    <Loader className="w-8 h-8 text-gray-500 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                </div>
            </main>
        );
    }

    // Show error message if payment is not completed
    if (error) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Error Loading Order</h2>
                    <p className="mt-4 text-gray-600">{error}</p>
                    <Button asChild>
                        <Link to="/shop">Return to Shop</Link>
                    </Button>
                </div>
            </main>
        );
    }

    // Calculate total price
    const totalPrice = order.items.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
    );

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            {/* Order Success Header */}
            <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-900">Order Successful!</h2>
                <p className="mt-2 text-lg text-gray-600">Thank you for your purchase</p>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold">Order Details</h3>
                <span className="text-gray-500">Order ID: {order._id}</span>
                <div className="border-t border-gray-200 pt-4">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium">${(item.product?.price || 0) * item.quantity}</p>
                        </div>
                    ))}
                    <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold text-lg">${totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <p>{order.addressId?.line_1 || "N/A"}</p>
                <p>{order.addressId?.city}, {order.addressId?.state} {order.addressId?.zip_code}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p>{order.addressId?.phone || "N/A"}</p>
                </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {order.paymentStatus}
                </span>
            </div>

            {/* Continue Shopping */}
            <div className="text-center">
                <Button asChild className="min-w-[200px]">
                    <Link to="/shop">Continue Shopping</Link>
                </Button>
            </div>
        </main>
    );
}

export default CompletePage;
