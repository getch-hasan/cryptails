import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function MyCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

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

  const removeFromCart = (id,variation) => {
    console.log(id,variation)
    const updatedCart = cart?.filter(
      (item) => !(item?.id === id && item?.variation?.variant_id === variation)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate subtotal
  const subtotal = cart?.reduce((acc, item) => acc + item?.totalPrice * item?.quantity, 0);
  const vat = (subtotal * 0.05).toFixed(2); // Assuming 5% VAT
  const total = (subtotal + parseFloat(vat)).toFixed(2);

  return (
    <div className="container-custom flex flex-col md:flex-row mt-16 px-4 py-10 md:px-8">
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Items</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Your cart is empty. Choose Your Food Now!
          </p>
        ) : (
          <div className="space-y-2 max-w-4xl border rounded-lg border-dashed border-primary mx-auto">
            {cart?.map((item) => (
              <div
                key={item?.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 w rounded-xl gap-2 transition"
              >
                {/* Image & Details */}
                <div className="flex flex-col md:flex-row items-center space-x-4 w-full sm:w-auto">
                  <div className="flex justify-start">
                    <Image
                      src="/images/pizza.webp"
                      width={180}
                      height={120}
                      className="rounded-md object-cover h-20 w-32"
                      alt={item?.name}
                    />
                  </div>
                  <div className="text-center md:text-start">
                    <h3 className="font-semibold text-lg text-gray-900">{item?.name}</h3>
                    {
                      item?.variation && <p className="text-sm text-gray-600">
                      Variation:{" "}
                      <span className="font-medium text-gray-800">{item?.variation?.variant_name}</span>
                    </p>
                    }
                    {item?.extras?.length > 0 && (
                      <p className="text-sm text-gray-500">
                        Extras:{" "}
                        <span className="text-gray-700">
                          {item.extras.map((extra) => extra?.cook_name).join(", ")}
                        </span>
                      </p>
                    )}
                    <p className="text-lg font-bold text-gray-900">
                      Tk {item?.totalPrice * item?.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center border px-2 rounded-lg bg-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <FaMinus className="text-gray-700" />
                    </button>
                    <span className="mx-3 text-lg font-semibold text-gray-900">
                      {item?.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <FaPlus className="text-gray-700" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item?.id,item?.variation?.variant_id)}
                    className="text-red-600 hover:text-red-800 transition bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary Card */}
      <div className="w-full md:w-1/3 mt-14 md:ml-6">
        <div className="p-6  rounded-xl border border-primary">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

          {/* Subtotal */}
          <div className="flex justify-between text-gray-700 mt-3">
            <span>Subtotal</span>
            <span className="font-semibold">Tk {subtotal}</span>
          </div>

          {/* VAT */}
          <div className="flex justify-between border-b-2 pb-2 text-gray-700 mt-2">
            <span>VAT (5%)</span>
            <span className="font-semibold">Tk {vat}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-gray-900 font-bold text-lg">
            <span>
              Total <span className="text-sm font-normal text-gray-500">(incl. VAT)</span>
            </span>
            <span className="text-primary">TK {total}</span>
          </div>

        
        </div>
      </div>
    </div>
  );
}
