import { ShoppingCart, User, Package, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navigation(props) {
  const cart = useSelector((state) => state.cart.value);
  
  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <div className="pt-6 pl-10 pb-12">
      <nav className="bg-[#eff5f5] pt-6 pl-10 pr-10 pb-4 flex items-center justify-between rounded-full shadow-lg w-[97%] max-w-[2000px] h-[80px] ">
        <div className="flex gap-x-20">
          <Link className="font-semibold text-3xl" to="/">
            Mebius
          </Link>
          <div className="flex items-center gap-10">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Link to="/shop/cart" className="flex items-center gap-4 relative">
              <p className="text-lg">{getCartQuantity()}</p>
              <div className="flex items-center gap-2">
                <ShoppingCart />
                Cart
              </div>
            </Link>
          </div>
          <SignedOut>
            <div className="flex items-center gap-4">
              <Link to="/sign-in" className="text-primary">
                Sign In
              </Link>
              <Link to="/sign-up" className="text-primary">
                Sign Up
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:text-primary outline-none">
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link to="/account" className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-orders" className="flex items-center gap-2 w-full">
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;


