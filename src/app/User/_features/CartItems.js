"use client";

import { useState, useEffect } from "react";
import CartIcon from "@/app/admin/_icons/ShoppingCart";
import CartFoodCard from "../_components/CartFoodCard";

export default function CartItems() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState([]);

  const increase = (id) => {
    const updated = cartItems.map(item => {
      if(item._id === id) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated.map(i => ({ _id: i._id, quantity: i.quantity }))));
  };

  const decrease = (id) => {
    const updated = cartItems.map(item => {
      if(item._id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated.map(i => ({ _id: i._id, quantity: i.quantity }))));
  };

  useEffect(() => {
    if(open) {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      const ids = stored.map(i => i._id);

      if(ids.length === 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems([]);
        return;
      }

      fetch("http://localhost:1000/food/get-by-ids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
      .then(res => res.json())
      .then(data => {
        // quantity-г restore хийх
        const withQuantity = data.map(food => {
          const cartItem = stored.find(i => i._id === food._id);
          return { ...food, quantity: cartItem.quantity };
        });
        setCartItems(withQuantity);
      });
    }
  }, [open]);

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-white rounded-full"
      >
        <CartIcon />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="h-screen w-[600px] bg-neutral-700 p-8 gap-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
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

            {/* Tabs */}
            <div className="w-full bg-white rounded-full h-11 p-1 gap-2 flex flex-row">
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

            <div className="text-white mt-5">
              {activeTab === "cart" && (
                <div className="flex flex-col gap-3">
                  {cartItems.length === 0 ? (
                    <p>No items in cart</p>
                  ) : (
                    cartItems.map(item => (
                      <CartFoodCard
                        key={item._id}
                        item={item}
                        increase={() => increase(item._id)}
                        decrease={() => decrease(item._id)}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === "order" && (
                <p>Order information will be shown here...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
