import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useCart } from "../contex";

export default function CartModal({ isOpen, handleCartOpen }) {
 const {cart,setCart}=useCart()



  const updateQuantity = (id, type) => {
    const updatedCart = cart?.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id, variationId) => {
    const updatedCart = cart?.filter(
      (item) => !(item.id === id && item.variation?.variant_id === variationId)
    );
  
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save changes to localStorage
  };
  

  const subtotal = cart?.reduce((acc, item) => acc + item?.totalPrice * item?.quantity, 0);
  const vat = (subtotal * 0.05).toFixed(2);
  const total = (subtotal + parseFloat(vat)).toFixed(2);

  if (!isOpen) return null;

  return (
    <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white max-w-3xl rounded-2xl relative">
     <button className="absolute top-3 right-3 text-gray-600  z-50 text-xl" onClick={handleCartOpen}>
          <FaTimes />
        </button>
     <div className="bg-white p-6 rounded-2xl border-2 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
        

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Items</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-2 max-w-4xl border rounded-lg border-dashed border-primary mx-auto p-4">
            {cart?.map((item) => (
              <div
                key={item?.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl gap-2 transition"
              >
                <div className="flex flex-col md:flex-row items-center space-x-4 w-full sm:w-auto">
                  <Image
                    src="/images/pizza.webp"
                    width={180}
                    height={120}
                    className="rounded-md object-cover h-20 w-32"
                    alt={item?.name}
                  />
                  <div className="text-center md:text-start">
                    <h3 className="font-semibold text-lg text-gray-900">{item?.name}</h3>
                    {item?.variation && (
                      <p className="text-sm text-gray-600">
                        Variation: <span className="font-medium text-gray-800">{item?.variation?.variant_name}</span>
                      </p>
                    )}
                    <p className="text-lg font-bold text-gray-900">Tk {item?.totalPrice * item?.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center border px-2 rounded-lg bg-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <FaMinus className="text-gray-700" />
                    </button>
                    <span className="mx-3 text-lg font-semibold text-gray-900">{item?.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <FaPlus className="text-gray-700" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item?.id, item?.variation?.variant_id)}
                    className="text-red-600 hover:text-red-800 transition bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-6 rounded-xl border border-primary mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="flex justify-between text-gray-700 mt-3">
            <span>Subtotal</span>
            <span className="font-semibold">Tk {subtotal}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-2 text-gray-700 mt-2">
            <span>VAT (5%)</span>
            <span className="font-semibold">Tk {vat}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold text-lg">
            <span>
              Total <span className="text-sm font-normal text-gray-500">(incl. VAT)</span>
            </span>
            <span className="text-primary">TK {total}</span>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}
