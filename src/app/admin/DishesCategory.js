"use client";

import { useState } from "react";
import axios from "axios";

export default function DishesCategoryAdmin() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;

    try {
      await axios.post("http://localhost:1000/category/add-category", {
        name: categoryName,
      });
      setOpen(false);
      setCategoryName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold text-[20px]">Dishes Category</div>

      {/* + BUTTON */}
      <div>
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-full flex justify-center items-center text-white text-2xl bg-red-500"
        >
          +
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[350px] flex flex-col gap-4 relative">

            {/* TITLE + X BUTTON */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add new category</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 text-xl hover:text-black"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border p-2 rounded-md w-full"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
