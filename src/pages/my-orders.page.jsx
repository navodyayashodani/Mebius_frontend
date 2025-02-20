import { useGetMyOrdersQuery } from "@/lib/api";
import { Link } from "react-router-dom";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function MyOrdersPage() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery(undefined, {
    skip: !isLoaded || !isSignedIn,
  });

  useEffect(() => {
    if (isSignedIn && userId) {
      refetch();
    }
  }, [isSignedIn, userId, refetch]);

  console.log("Auth state:", { isLoaded, isSignedIn, userId });
  console.log("Orders state:", { orders, isLoading, error });

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Authentication Required</h2>
          <p className="mt-2 text-gray-600">Please sign in to view your orders.</p>
          <Link to="/sign-in" className="mt-4 inline-block text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-500">Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    console.error("Order fetch error:", error);
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Orders</h2>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View order history</p>
        </div>

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <span className="font-medium text-gray-900">Order #{order._id}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.paymentStatus === "PAID" 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-500">
                              ${parseFloat(item.product.price).toFixed(2)} per item
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Amount</span>
                      <span className="text-xl font-bold text-primary">
                        ${order.items.reduce((total, item) => 
                          total + (parseFloat(item.product.price) * item.quantity), 0
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.addressId && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.addressId.line_1}</p>
                        {order.addressId.line_2 && <p>{order.addressId.line_2}</p>}
                        <p>{order.addressId.city}, {order.addressId.state} {order.addressId.zip_code}</p>
                        <p>Phone: {order.addressId.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-600 mb-6">
              When you place orders, they will appear here
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage; 