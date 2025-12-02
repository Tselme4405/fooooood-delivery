"use client";

import QuantityMinusIcon from "../_icons/quantityMinusIcon";
import QuantityPlusIcon from "../_icons/quantityPlusIcon";
import XIcon from "../_icons/XIcon";

export default function CartFoodCard({ item, increase, decrease }) {
  const { foodName, foodIngredients, foodImage, foodPrice, quantity } = item;

  return (
    <div className="flex flex-row gap-4 bg-white rounded-[20px] p-4 items-center shadow-md">
      <div
        className="w-20 h-20 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${foodImage})` }}
      ></div>

      <div className="flex-1 flex flex-col justify-between h-20">
        <div className="text-[18px] font-bold text-red-500">{foodName}</div>
        <div className="text-[14px] text-gray-700">{foodIngredients}</div>
        <div className="text-[14px] text-gray-700">Price: {foodPrice}₮ x {quantity}</div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div
          onClick={decrease}
          className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
        >
          <QuantityMinusIcon />
        </div>
        <div>{quantity}</div>
        <div
          onClick={increase}
          className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
        >
          <QuantityPlusIcon />
        </div>
      </div>

      <div className="text-[16px] font-bold ml-4">{foodPrice * quantity}₮</div>

      <div className="ml-2 cursor-pointer">
        <XIcon />
      </div>
    </div>
  );
}
