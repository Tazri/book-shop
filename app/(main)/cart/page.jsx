"use client";
import AddressForm from "@/components/cartPage/AddressForm";
import CartList from "@/components/cartPage/CartList";
import CheckoutSummary from "@/components/cartPage/CheckoutSummary";
import { getDemoCity } from "@/data/demoCity";
import { isValidPhoneNumber } from "@/libs/validation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function CartPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [allCity, setAllCity] = useState([]);

  useEffect(() => {
    const allCityData = getDemoCity();
    setAllCity(allCityData);
  }, []);

  const sumbitAction = (formData) => {
    const books = getBooks(formData);
    const orderData = {
      addressDetails: formData.address,
      city: formData.city,
      area: formData.area,
      orders: books,
    };

    console.log(orderData);
  };
  return (
    <form
      onSubmit={handleSubmit(sumbitAction)}
      className="flex-grow container mx-auto flex gap-2  my-2 duration-150 flex-col md:flex-row"
    >
      <CartList register={register} setValue={setValue} />

      {/* cart summary */}
      <div className="p-1 flex-grow max-w-none md:max-w-72 lg:max-w-96 flex flex-col gap-4 duration-150">
        <AddressForm
          setValue={setValue}
          allCity={allCity}
          register={register}
          errors={errors}
          trigger={trigger}
        />
        <CheckoutSummary />
        <button className="bg-primary text-white py-2 px-3 text-xs s185:text-sm s220:text-base duration-150">
          Proceed to Check Out
        </button>
      </div>
    </form>
  );
}

function getBooks(formData) {
  const keys = Object.keys(formData);
  const bookIds = [];

  for (const key of keys) {
    if (key.startsWith("book-")) {
      bookIds.push(key.split("book-")[1]);
    }
  }

  const books = {};

  for (const bookId of bookIds) {
    books[bookId] = formData["book-" + bookId];
  }

  return books;
}

function validate(formData) {
  const city = formData.city;
  const area = formData.area;
  const phone = formData.phone;
  const address = formData.address;
  const updateFormError = {
    city: "",
    area: "",
    phone: "",
    address: "",
  };

  updateFormError.phone = isValidPhoneNumber(phone ?? "");
  updateFormError.address =
    address?.length < 10
      ? "Please write your address minimum 10 character."
      : "";
  updateFormError.city = city ? "" : "Please select city.";
  updateFormError.area = area ? "" : "Please select area.";

  return updateFormError;
}

export default CartPage;
