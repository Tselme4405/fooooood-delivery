"use client";

import { useState, useEffect } from "react";
import CartIcon from "@/app/admin/_icons/ShoppingCart";
import CartFoodCard from "../_components/CartFoodCard";

export default function CartItems() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState([]);

  const increase = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  const decrease = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      const ids = stored.map((i) => i._id);

      if (ids.length === 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems([]);
        return;
      }

      fetch("http://localhost:1000/food/get-by-ids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
        .then((res) => res.json())
        .then((data) => {
          const withQuantity = data.map((food) => {
            const cartItem = stored.find((i) => i._id === food._id);
            return { ...food, quantity: cartItem.quantity };
          });
          setCartItems(withQuantity);
        });
    }
  }, [open]);

  return (
    <div>
      {/* Cart Icon */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-white rounded-full"
      >
        <CartIcon />
      </div>

      {/* Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="h-screen w-[600px] bg-neutral-700 p-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-between items-center mb-4">
              <div className="flex flex-row gap-3 items-center">
                <CartIcon />
                <div className="text-[20px] text-white font-bold">
                  Order detail
                </div>
              </div>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer text-white text-2xl"
              >
                ×
              </div>
            </div>
            <div className="w-full bg-white rounded-full h-11 p-1 gap-2 flex flex-row mb-5">
              <div
                onClick={() => setActiveTab("cart")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "cart" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Cart
              </div>

              <div
                onClick={() => setActiveTab("order")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "order" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Order
              </div>
            </div>
            <div className="flex-1 overflow-y-auto text-white">
              {activeTab === "cart" && (
                <>
                  {cartItems.length === 0 ? (
                    <p>No items in cart</p>
                  ) : (
                    cartItems.map((item) => (
                      <CartFoodCard
                        key={item._id}
                        item={item}
                        increase={() => increase(item._id)}
                        decrease={() => decrease(item._id)}
                        remove={() => removeFromCart(item._id)}
                      />
                    ))
                  )}
                </>
              )}
            </div>
            {activeTab === "cart" && (
              <div className="mt-4 h-[276px] w-full bg-white rounded-[20px] p-4 flex flex-col gap-5 font-bold">
                <div className="text-[#71717A] text-[20px]">Payment info</div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between w-full h-[28px]">
                    <div className="text-[#71717A]">Items</div>
                    <div className="text-black font-bold">10000$</div>
                  </div>
                  <div className="flex flex-row justify-between w-full h-[28px]">
                    <div className="text-[#71717A]">Shipping</div>
                    <div className="text-black font-bold">5000$</div>
                  </div>
                </div>
                <div
                  className="h-px w-full"
                  style={{ backgroundImage: "url('/line.png')" }}
                ></div>

                <div className="flex flex-row justify-between w-full h-[28px]">
                  <div className="text-[#71717A]">Total</div>
                  <div className="text-black font-bold">20000$</div>
                </div>
                <div className="w-full h-11 bg-red-500 text-white rounded-full flex items-center justify-center">
                  Checkout
                </div>
              </div>
            )}

            {activeTab === "order" && (
              <div className="p-4 text-white">
                <p>Order information will be shown here...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
