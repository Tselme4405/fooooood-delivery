import { useState } from "react";
import EditIcon from "../_icons/EditIcon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AdminFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
}) {
  const [open, setOpen] = useState(false);

  const foodSchema = Yup.object().shape({
    foodName: Yup.string().required("Food Name Required!"),
    foodPrice: Yup.string().required("Food Price Required!"),
    foodIngredients: Yup.string().required("Ingredients is Required!"),
    foodImage: Yup.mixed().required("Food Image is required"),
  });

  return (
    <div className=" p-4 w-[270.75px] h-[241px] border border-[#E4E4E7] rounded-[20px] gap-5 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
        className="h-[129px] w-full bg-black rounded-xl flex justify-end items-end p-5 bg-cover"
      >
        <div
          onClick={() => setOpen(true)}
          className="w-11 h-11 flex items-center justify-center bg-white rounded-full"
        >
          <EditIcon />
        </div>
      </div>
      <div className="h-[60px] w-full bg-white flex flex-col gap-2”">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[14px] color-red-500  text-red-500">
            {foodName}
          </div>
          <div className="text-[12px] font-bold">{foodPrice}₮</div>
        </div>
        <div className="w-full h-[32px] text-[12px]">{foodIngredients}</div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <Formik
            initialValues={{
              foodName: "",
              foodPrice: "",
              foodIngredients: "",
              foodImage: null,
            }}
            validationSchema={foodSchema}
            // onSubmit={handleSubmit}
            className=" fixed inset-0 bg-black/40 flex justify-center items-center"
          >
            {({ setFieldValue }) => (
              <Form className="bg-white p-6 rounded-xl shadow-xl w-[472px] h-[596px] flex flex-col gap-6 relative justify-between">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Add new Dish to</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-row gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-[14px]">Food name</div>
                    <Field
                      name="foodName"
                      placeholder="Type food name"
                      className="border rounded-md h-[38px] p-2 "
                    />
                    <ErrorMessage
                      name="foodName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-[14px]">Food price</div>
                    <Field
                      name="foodPrice"
                      placeholder="Enter price"
                      className="border rounded-md h-[38px] p-2"
                    />
                    <ErrorMessage
                      name="foodPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>Ingredients</div>
                  <Field
                    name="foodIngredients"
                    placeholder="List ingredients..."
                    className="border rounded-md h-[38px] p-2"
                  />
                  <ErrorMessage
                    name="foodIngredients"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[14px] font">Food image</div>
                  <input
                    type="file"
                    name="foodImage"
                    onChange={(e) =>
                      setFieldValue("foodImage", e.target.files[0])
                    }
                    className="border p-2 rounded-md w-full h-[138px] bg-gray-100"
                    accept="image/*"
                  />
                </div>

                <div className="flex justify-end gap-3 w-full h-[64px] items-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-black text-white"
                  >
                    Add Dish
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
