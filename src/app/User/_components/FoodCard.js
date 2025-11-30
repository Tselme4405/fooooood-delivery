import PlusIcon from "../_icons/plusIcon";

export default function UserFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
}) {
  return (
    <div className="w-[397px] bg-white rounded-[20px] p-4 gap-5 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
        className="h-[210px] bg-cover rounded-xl bg-center p-5 flex justify-end items-end"
      >
        <div className="w-11 h-11 rounded-full flex justify-center items-center bg-white">
          <PlusIcon />
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-[24px] text-red-500">{foodName}</div>
          <div className="text-[18px] font-bold">{foodPrice}₮</div>
        </div>
        <div className="text-[14px] w-full">{foodIngredients}</div>
      </div>
    </div>
  );
}
