
/*import { useSelector } from "react-redux";
import { Link } from "react-router";


function CartPage() {

    const cart = useSelector((state) => state.cart.value);
    console.log(cart);


    return (
        <main className="px-8">
            <h2 className="text-4xl font-bold">My Cart</h2>
            <div>
                {JSON.stringify(cart)}
            </div>

            <Link to="/shop/checkout">Proceed Checkout</Link>
        </main>
    );
}

export default CartPage;*/



/*import { useSelector } from "react-redux";
import { X } from "lucide-react";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.value);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div>
        {JSON.stringify(cartItems)}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CartItemList items={cartItems} />
        </div>
        <div className="md:w-1/3">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}

function CartItemList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.product._id} item={item} />
      ))}
    </div>
  );
}

function CartItem({ item }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <img
        src={item.product.image}
        alt={item.product.name}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.price}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
    </div>
  );
}

function CartSummary({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">
        Proceed to Checkout
      </button>
    </div>
  );
}*/


import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { removeFromCart } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-14 py-8">
      <h1 className="text-4xl font-bold mb-8">My Cart</h1>
      {/*<div>{JSON.stringify(cartItems)}</div>*/}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CartItemList items={cartItems} dispatch={dispatch} />
        </div>
        <div className="md:w-1/3">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}

function CartItemList({ items, dispatch }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.product._id} item={item} dispatch={dispatch} />
      ))}
    </div>
  );
}

function CartItem({ item, dispatch }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <img
        src={item.product.image}
        alt={item.product.name}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.price}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => dispatch(removeFromCart(item.product._id))}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

function CartSummary({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 ml-72">
        <Button asChild>
          <Link to="/shop/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}






