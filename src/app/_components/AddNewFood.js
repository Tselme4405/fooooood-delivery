import PlusIcon from "../_icons/plusIcon";

export default function AddNewFoodCard() {
  return (
    <div className="w-[270.75px] h-[241px] border rounded-xl border-red-500 flex flex-col justify-center items-center gap-6">
      <div className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center">
        <PlusIcon />
      </div>
      <div className="text-[14px] max-w-[154px] flex justify-center items-center ">
        Add new Dish to Appetizers
      </div>
    </div>
  );
}
