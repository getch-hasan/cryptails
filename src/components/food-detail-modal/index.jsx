import React, { useCallback, useEffect, useState } from "react";
import { FoodDetailSkeleton } from "../skeleton";
import { publicRequest } from "@/config/axios.config";
import { FaClock, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import Image from "next/image";
import { Toastify } from "../tostify";
import { useCart } from "../contex";

const FoodeDetail = ({ handleFoodModal, id }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [selectedVariation, setSelectedVariation] = useState("");
  const { cart, setCart } = useCart();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (id) {
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
    if (food?.variants.length > 0 && !selectedVariation) return;

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
      Toastify.Success("Item Added to cart");
    }
  };
  // if(loading){
  //   return <FoodDetailSkeleton/>
  // }
  return (
    <div className="fixed inset-0 flex items-center h-screen justify-center bg-black bg-opacity-50 z-50">
      {loading ? (
        <FoodDetailSkeleton />
      ) : (
        <div className="bg-white relative rounded-2xl mx-2 p-2">
          <button
            className="absolute -top-1 -right-0 text-red-800 text-3xl z-50 font-bold"
            onClick={handleFoodModal}
          >
            &times;
          </button>
          <div
          className="  container-custom bg-white  p-6 rounded-2xl  w-full max-w-5xl transition-all duration-300 relative max-h-[90vh] overflow-y-auto  md:max-w-2xl sm:max-w-sm scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                height={500}
                width={1000}
                src={`${process.env.NEXT_PUBLIC_API_SERVER}/${food?.cook_image}`}
                alt="Italian hot pizza"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                {food?.cook_name}
              </h2>
              <div className="flex items-center text-gray-500 mt-2 justify-center md:justify-start">
                {/* <span className="mr-2 text-sm">🍕 Pizza Italian</span> */}
                <FaStar className="text-yellow-400" />
                <span className="ml-1 text-sm">{food?.rating} </span>
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
              <p className="text-xl font-semibold mt-3 text-gray-900">
                Price: <span className="text-primary">{food?.price}tk</span>
              </p>

              {food?.variants?.length > 0 && (
                <div className="bg-gray-100 p-5 rounded-lg mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold text-gray-900">
                      Variation
                    </p>
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
                        className="flex items-center justify-between bg-slate-50 p-3 rounded-lg cursor-pointer transition hover:bg-slate-200"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            value={variation?.variant_id}
                            checked={
                              selectedVariation?.variant_id ===
                              variation?.variant_id
                            }
                            onChange={() => setSelectedVariation(variation)}
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
              )}
            </div>
          </div>

          <div className="flex  items-center gap-3 mt-6">
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
            <button
              onClick={addToCart}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                selectedVariation
                  ? "bg-black text-white hover:bg-primary"
                  : "bg-gray-400"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
        </div>
      )}
     
    </div>
  );
};

export default FoodeDetail;
