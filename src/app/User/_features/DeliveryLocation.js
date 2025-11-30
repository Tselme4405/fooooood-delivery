"use client";

import ChevronRight from "@/app/admin/_icons/ChevronRightGray";
import MapPin from "@/app/admin/_icons/MapPin";
import { useState } from "react";

export default function DeliverLocation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cursor-pointer w-[251px] h-9 bg-white rounded-full flex items-center gap-1 justify-center">
        <div className="w-5 h-5">
          <MapPin />
        </div>

        <span className="text-red-500 text-[12px]">Delivery address:</span>

        <div
          className="flex items-center text-[12px] text-[#71717A]"
          onClick={() => setOpen(true)}
        >
          Add Location <ChevronRight />
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="
            fixed inset-0 
            bg-black/40 
            flex items-center justify-center 
            z-50
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[502px] min-h-[280px] p-6 bg-white rounded-xl shadow-xl justify-between flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Please write your delivery address!
            </h2>

            <textarea
              className="w-full py-2 px-3 border rounded-md min-h-[80px]"
              placeholder="Please share your complete address"
            />

            <div className="flex flex-row gap-4 w-[454px] h-[64px] justify-end  items-end">
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer text-[14px] bg-white border border-[#E4E4E7] text-black w-[79px] h-[40px] rounded-md"
              >
                Cancel
              </button>
              <button className="cursor-pointer text-[14px] bg-black text-white w-[115px] h-[40px] rounded-md">
                Deliver Here
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
