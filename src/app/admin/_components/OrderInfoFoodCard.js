"use client";

import { ChevronDown, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const statusBorderColors = {
    pending: "#EF4444",
    delivered: "rgba(24, 186, 81, 0.50)",
    canceled: "#E4E4E7",
  };

  const [currentStatus, setCurrentStatus] = useState(status);
  const [isSelected, setIsSelected] = useState(false);

  const statuses = ["pending", "delivered", "cancelled"];

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:1000/orders/${_id}/status`, {
        status: newStatus,
      });

      setCurrentStatus(newStatus);
      getData();
    } catch (err) {
      console.log("err", err);
    }
  };

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

      <div className="w-[160px] p-4 flex justify-between">
        {FoodOrderItems?.length} foods <ChevronDown />
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

// pending ----> #EF4444
// delivered --> rgba(24, 186, 81, 0.50)
// cancelled --> #E4E4E7
