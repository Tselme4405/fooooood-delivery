"use client";

import { ChevronDown, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

export default function OrderInfo({
  _id,
  email,
  totalPrice,
  createdAt,
  FoodOrderItems,
  deliveryLocation,
  status,
  getData,
}) {
  const [openFoods, setOpenFoods] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isSelected, setIsSelected] = useState(false);
  const statuses = ["pending", "delivered", "cancelled"];
  const [foods, setFoods] = useState([]);

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:1000/orders/${_id}/status`, {
        status: newStatus,
      });

      setCurrentStatus(newStatus);
      toast.success("Status amjilttai shineclegdlee");
      getData();
    } catch (err) {
      console.log("err", err);
    }
  };

  const getFoods = async () => {
    try {
      const res = await axios.get("http://localhost:1000/food");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFoods();
  });

  return (
    <div
      className="flex flex-row w-full h-[56px] border justify-between transition-colors"
      style={{
        backgroundColor: isSelected ? "#E4E4E7" : "white",
      }}
    >
      <div className="w-[48px] flex justify-center items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => setIsSelected(e.target.checked)}
        />
      </div>

      <div className="w-[56px] h-[56px] p-4">1</div>

      <div className="min-w-[213.5px] p-4">{email}</div>

      <div className="w-[160px] p-4 relative">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setOpenFoods(!openFoods)}
        >
          {FoodOrderItems?.length} foods <ChevronDown />
        </div>
        {openFoods && (
          <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded p-3 border text-sm z-50 w-[263px] flex flex-col gap-3">
            {FoodOrderItems?.map((f) => {
              const currentFood = foods?.find(
                (food) => food._id === f?.food?._id
              );

              return (
                <div key={f._id} className="flex items-center gap-3 py-1">
                  <img
                    src={currentFood?.foodImage}
                    alt={currentFood?.foodName}
                    className="w-8 h-8 object-cover rounded"
                  />

                  {/* NAME + QUANTITY */}
                  <div className="flex justify-between w-full">
                    <span>{currentFood?.foodName || "Unknown food"}</span>
                    <span className="text-black">x {f.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-[160px] p-4">{createdAt?.slice(0, 10)}</div>

      <div className="p-4 w-[160px]">{totalPrice}</div>

      <div className="w-[213.5px] overflow-y-auto">{deliveryLocation}</div>

      <div className="w-[160px] flex items-center p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              // style={{
              //   border: `2px solid ${statusBorderColors[currentStatus]}`,
              // }}
              className={`h-[32px] min-w-[94px] cursor-pointer flex items-center gap-[10px] border rounded-full px-[10px] bg-white ${
                currentStatus === "pending"
                  ? "border-[#EF4444]"
                  : currentStatus === "delivered"
                  ? "border-[#18BA51]"
                  : ""
              }`}
            >
              {currentStatus}
              <ChevronsUpDown />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            {statuses.map((st) => (
              <DropdownMenuItem
                key={st}
                onClick={() => updateStatus(st)}
                className="cursor-pointer"
              >
                {st}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
