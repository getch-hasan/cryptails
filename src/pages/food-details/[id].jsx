import { FoodDetailSkeleton } from "@/components/skeleton";
import { Toastify } from "@/components/tostify";
import { publicRequest } from "@/config/axios.config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect, useCallback } from "react";
import { FaStar, FaClock, FaPlus, FaMinus, FaCheck } from "react-icons/fa";

export default function FoodDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [selectedVariation, setSelectedVariation] = useState("");
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState({});
  const [loading,setLoading]=useState(false)
  console.log(food?.childs);
  const fetchCook = useCallback(async () => {
 
  
    setLoading(true); // Start loading
  
    try {
      const res = await publicRequest(`cook/${id}`);
  
      if (res.status === 200) {
        console.log(res?.data?.data);
        setFood(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching cook data:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  }, [id, setFood, setLoading]); // Add dependencies

  useEffect(() => {
    if(id){
      fetchCook();
    }
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [id]);

  
  const toggleExtra = (id) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateQuantity = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const addToCart = () => {
    // if (!selectedVariation) return;

    const selectedExtrasArray = food?.childs.filter(
      (item) => selectedExtras[item?.cook_id]
    );

    const newCartItem = {
      id: food?.cook_id,
      name: food?.cook_name,
      variation: selectedVariation,
      quantity,
      extras: selectedExtrasArray,
      totalPrice:
      (selectedVariation?.variant_price || food?.price) +
      selectedExtrasArray?.reduce((sum, item) => sum + item?.price, 0),
    
    };

    // Check if the item already exists in the cart (same ID & variation)
    const existingItemIndex = cart?.find(
      (item) =>
        item.id === newCartItem?.id && item.variation === newCartItem?.variation
    );

    if (existingItemIndex) {
      Toastify.Warning("Already in Card");
    } else {
      // If item is new, add it to the cart
      const updatedCart = [...cart, newCartItem];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
   
  };
if(loading){
  return <FoodDetailSkeleton/>
}
  return (
    <div className="container-custom mt-16 p-6 rounded-2xl  border-2  w-full max-w-4xl transition-all duration-300">
      {/* Desktop Layout: Two-column design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div>
          <Image
            height={500}
            width={1000}
            src={`${process.env.NEXT_PUBLIC_API_SERVER}/${food?.cook_image}`}
            alt="Italian hot pizza"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right: Food Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {food?.cook_name}
          </h2>
          <div className="flex items-center text-gray-500 mt-2">
            <span className="mr-2 text-sm">🍕 Pizza Italian</span>
            <FaStar className="text-yellow-400" />
            <span className="ml-1 text-sm">{food?.rating} (2.2k reviews)</span>
          </div>

          <div className="flex items-center justify-between mt-5 text-gray-600">
            <p className="text-md font-semibold">Details</p>
            <div className="flex items-center">
              <FaClock className="text-gray-500 mr-1" />
              <span className="text-sm">{food?.cook_time} min</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            {food?.about_cook}
          </p>
          <p className="text-xl font-semibold mt-3 text-gray-900">Price: <span className="text-primary">{food?.price}tk</span> </p>

          {/* Variation Selection */}
          {
            food?.variants?.length>0 && <div className="bg-gray-100 p-5 rounded-lg mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-semibold text-gray-900">Variation</p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  selectedVariation
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {selectedVariation ? "Complete" : "Required"}
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {food?.variants?.map((variation) => (
                <label
                  key={variation.id}
                  className="flex items-center justify-between hover:bg-slate-200 bg-slate-50 p-3 rounded-lg  cursor-pointer  transition"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="variation"
                      value={variation?.variant_id}
                      checked={selectedVariation?.variant_id === variation?.variant_id}
                      onChange={() => setSelectedVariation(variation)} // Store full object
                      className="w-5 h-5 accent-primary"
                    />

                    <span className="text-gray-700 font-medium">
                      {variation?.variant_name}
                    </span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    Tk {variation?.variant_price}
                  </span>
                </label>
              ))}
            </div>
          </div>
          }
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div className="mt-8">
        <p className="text-lg font-semibold text-gray-900">
          Frequently bought together
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {food?.childs?.map((item) => (
            <label
              key={item?.cook_id}
              className="flex items-center justify-between bg-gray-200 p-3 rounded-lg cursor-pointer transition"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedExtras[item?.cook_id] || false}
                  onChange={() => toggleExtra(item?.cook_id)}
                  className="hidden"
                />
                <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-md transition-all duration-200">
                  {selectedExtras[item?.cook_id] && (
                    <FaCheck className="text-primary " />
                  )}
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.cook_image}`}
                  alt={item?.cook_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {item?.cook_name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 text-nowrap ">
                + Tk {item?.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex items-center gap-3 mt-6">
        {/* Quantity Selector */}
        <div className="flex items-center border px-4 py-2 rounded-lg">
          <button
            className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            onClick={() => updateQuantity("decrease")}
          >
            <FaMinus className="text-gray-700" />
          </button>
          <span className="mx-4 text-lg font-semibold text-gray-900">
            {quantity}
          </span>
          <button
            className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            onClick={() => updateQuantity("increase")}
          >
            <FaPlus className="text-gray-700" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={addToCart}
          // disabled={!selectedVariation}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
            selectedVariation
              ? "bg-black text-white hover:bg-primary"
              : "bg-gray-400 "
          }`}
        >
          Add to Cart
        </button>
        <Link
          href={"/my-cart"}
          className="w-full relative text-center bg-primary rounded-lg font-semibold text-lg py-3"
        >
          View Cart
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart?.length}
            </span>
          )}{" "}
        </Link>
      </div>
    </div>
  );
}
