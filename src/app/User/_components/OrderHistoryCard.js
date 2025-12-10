import { useEffect, useState } from "react";

export default function OrderHistoryCard({ order, foods = [] }) {
  return (
    <div className="px-3 flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div className="text-black text-[16px]">{order.totalPrice}₮</div>
          <div className="text-black text-[16px]">#{order.orderNumber}</div>
        </div>
        <div className="rounded-full border border-red-500 text-black px-[10px] py-1">
          {order.status}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {order.FoodOrderItems.map((item, index) => {
          const currentFood = foods.find((food) => food._id === item?.food._id);
          return (
            <div className="flex justify-between" key={index}>
              <div className="text-[#71717A]">
                {currentFood?.foodName || "Unknown food"}
              </div>
              <div className="text-black">x {item.quantity}</div>
            </div>
          );
        })}
      </div>

      <div className="text-[#71717A]">{order.createdAt}</div>
      <div className="min-h-[16px] w-full text-[#71717A] overflow-auto">
        {order.deliveryLocation}
      </div>
      <div
        className="h-px w-full mt-5"
        style={{ backgroundImage: "url('/line.png')" }}
      ></div>
    </div>
  );
}
