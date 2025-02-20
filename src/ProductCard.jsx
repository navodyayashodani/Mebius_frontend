import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { Link } from "react-router-dom";
function ProductCard(props) {
  //const [num, setNum] = useState(0);

  

  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch()

  const handleClick = (e) => {
    //setNum(num + 1);
    dispatch(addToCart({
      _id: props._id,
      name: props.name,
      price: props.price,
      image: props.image,
      description: props.description,
    }));
    
  };

  return (
    
    <Card className="hover:shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
      <Link to={`/shop/${props._id}`}>
      <div className="h-80 bg-card rounded-lg p-4 relative">
        <img src={props.image} className="block" />
      </div>
      <div className="flex px-4 mt-4  items-center justify-between">
        <h2 className="text-2xl  font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
        
      </div>
      </Link>
      <div className="mt-1 p-4">
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
      
    </Card>
  );
}

export default ProductCard;


