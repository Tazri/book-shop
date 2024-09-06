"use client";
import AddressForm from "@/components/cartPage/AddressForm";
import CartList from "@/components/cartPage/CartList";
import CheckoutSummary from "@/components/cartPage/CheckoutSummary";
import { getDemoCityAndArea } from "@/data/demoCityAndArea";
import { isValidPhoneNumber } from "@/libs/validation";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const defaultCityAndArea = getDemoCityAndArea();

function CartPage() {
  const [cityId, setCityId] = useState("");
  const areaInput = useRef();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const isFirstTimeSubmit = useRef(true);
  const router = useRouter();

  const [formError, setFormError] = useState({
    city: "",
    area: "",
    phone: "",
    address: "",
  });

  const handleCityIdSelect = (e) => {
    if (areaInput.current) {
      areaInput.current.value = "";
    }
    setCityId(e.target.value);

    if (!isFirstTimeSubmit.current) {
      setFormError((prevError) => {
        return {
          ...prevError,
          city: e.target.value ? "" : "Please select city.",
          area: "Please select area.",
        };
      });
    }
  };

  const handleAreaSelect = (e) => {
    if (!isFirstTimeSubmit.current) {
      setFormError((prevError) => {
        return {
          ...prevError,
          area: e.target.value ? "" : "Please select area.",
        };
      });
    }
  };

  const handlePhone = (e) => {
    const number = e.target.value;

    if (checkItNumber(number) && number?.length < 14) {
      setPhone(number);

      if (!isFirstTimeSubmit.current) {
        const isValidPhone = isValidPhoneNumber(number);

        setFormError((prevError) => {
          return { ...prevError, phone: isValidPhone };
        });
      }
    }
  };

  const handleAddress = (e) => {
    const value = e.target.value;

    if (!address && value === " ") return;

    if (address.length === 0) {
      setAddress(value);
      return;
    }

    const lastCharOfAddress = address[address.length - 1];
    const lastChar = value[value.length - 1];

    if (lastChar === " " && lastCharOfAddress === " ") return;

    setAddress(value);
    if (!isFirstTimeSubmit.current) {
      setFormError((prevError) => {
        return {
          ...prevError,
          address:
            value?.length < 10
              ? "Please write your address minimum 10 character."
              : "",
        };
      });
    }
  };

  const sumbitAction = (formBody) => {
    isFirstTimeSubmit.current = false;
    const formData = Object.fromEntries(formBody.entries());
    const phone = formData.phone;
    const address = formData.address;
    const city = formData.address;
    const area = formData.area;

    const books = getBooks(formData);

    const updateFormError = validate(formData);

    if (Object.values(updateFormError).every((v) => !v)) {
      const cartData = {
        city,
        area,
        address,
        phone,
        books,
      };

      console.log(cartData);
      router.push("/checkout");
    } else {
      setFormError(updateFormError);
    }
  };

  return (
    <form
      action={sumbitAction}
      className="flex-grow container mx-auto flex gap-2  my-2 duration-150 flex-col md:flex-row"
    >
      <CartList />

      {/* cart summary */}
      <div className="p-1 flex-grow max-w-none md:max-w-72 lg:max-w-96 flex flex-col gap-4 duration-150">
        <AddressForm
          cityAndArea={defaultCityAndArea}
          phone={phone}
          cityId={cityId}
          address={address}
          handleAddress={handleAddress}
          handleCityIdSelect={handleCityIdSelect}
          handlePhone={handlePhone}
          handleAreaSelect={handleAreaSelect}
          formError={formError}
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

function checkItNumber(str) {
  if (!str) return true;
  const number = "0123456789";

  for (const char of str) {
    if (!number.includes(char)) {
      return false;
    }
  }

  return true;
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
