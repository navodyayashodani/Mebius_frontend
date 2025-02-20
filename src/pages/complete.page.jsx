import { Button } from "@/components/ui/button";
import { useGetOrderQuery } from "@/lib/api";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, MapPin, Phone } from "lucide-react";

function CompletePage() {
    const [searchParams] = useSearchParams();
    const rawOrderId = searchParams.get("orderId");
    const orderId = rawOrderId?.replace(/['"]+/g, '');
    
    const { data, isLoading, error } = useGetOrderQuery(orderId, {
        skip: !orderId
    });

    if (!orderId) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Order Not Found</h2>
                    <p className="mt-4 text-gray-600">No order ID was provided.</p>
                    <div className="mt-6">
                        <Button asChild>
                            <Link to="/shop">Return to Shop</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Error Loading Order</h2>
                    <p className="mt-4 text-gray-600">There was a problem loading your order details.</p>
                    <p className="mt-2 text-sm text-gray-500">Error: {error.message}</p>
                    <div className="mt-6">
                        <Button asChild>
                            <Link to="/shop">Return to Shop</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="animate-pulse">
                        <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
                        <div className="mt-8 h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    const totalPrice = data.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Order Success Header */}
            <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-900">Order Successful!</h2>
                <p className="mt-2 text-lg text-gray-600">Thank you for your purchase</p>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Order Details</h3>
                    <span className="text-gray-500">Order ID: {data._id}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    {/* Order Items */}
                    <div className="space-y-4">
                        {data.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Package className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">${item.product.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Total Price */}
                    <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold text-lg">${totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                </div>
                <div className="ml-7 space-y-1 text-gray-600">
                    <p>{data.addressId.line_1}</p>
                    {data.addressId.line_2 && <p>{data.addressId.line_2}</p>}
                    <p>{data.addressId.city}, {data.addressId.state} {data.addressId.zip_code}</p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p>{data.addressId.phone}</p>
                    </div>
                </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                        ${data.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {data.paymentStatus}
                    </span>
                </div>
            </div>

            {/* Continue Shopping Button */}
            <div className="text-center">
                <Button asChild className="min-w-[200px]">
                    <Link to="/shop">Continue Shopping</Link>
                </Button>
            </div>
        </main>
    );
}

export default CompletePage;
