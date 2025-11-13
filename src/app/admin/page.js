import HeaderIcon from "../_icons/HeaderIcon";
import FoodMenuAdmin from "../_icons/MenuIcon";
import TruckIcon from "../_icons/TruckIcon";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-[#F4F4F5]">
      <div className="flex flex-col w-[205px] bg-white p-4 items-center gap-10 shadow-sm">
        <div className="flex flex-row gap-3 items-center">
          <HeaderIcon />
          <div>
            <div className="text-[20px] text-black font-bold">NomNom</div>
            <div className="text-[12px] text-[#71717A]">Swift delivery</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2.5 w-full h-10 px-4 rounded-full cursor-pointer">
            <FoodMenuAdmin />
            <span className="text-[14px] text-[#09090B] font-medium">
              Food menu
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full h-10 px-4 rounded-full cursor-pointer">
            <TruckIcon />
            <span className="text-[14px] text-[#09090B] font-medium">
              Orders
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">{/* Доторх контент энд гарна */}</div>
    </div>
  );
}
