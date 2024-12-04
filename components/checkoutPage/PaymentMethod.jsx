import cashOnDeliveryOptionImg from "@/assets/payment-option-icons/cash-on-delivery.webp";
import bkashOptionImg from "./../../assets/payment-option-icons/bkash.webp";
import nogodOptionImg from "./../../assets/payment-option-icons/nogod.png";
import upayOptionImg from "./../../assets/payment-option-icons/upay.webp";
import Image from "next/image";
import PaymentOption from "./PaymentOption";
import roketOptionImg from "./../../assets/payment-option-icons/roket.webp";
import craditAndDebitCardOptionImg from "./../../assets/payment-option-icons/cradit-debit-card.png";
import CheckBox from "../formUi/CheckBox";
import Link from "next/link";

function PaymentMethod() {
  return (
    <div className="p-1 flex-grow max-w-2xl">
      <h1 className="text-xs s185:text-sm s220:text-base s280:text-lg s340:text-xl s500:text-2xl duration-150 pb-2 border-b text-[#333333]">
        Select Payment Method
      </h1>

      <div className="w-full my-3 px-0.5 s320:px-2 py-2 duration-150">
        <h3 className="text-sm s280:text-base s410:text-lg font-semibold text-[#555555]">
          Cash on Delivery
        </h3>
        <p className="text-[#777777] mb-2 text-xs s280:text-sm s410:text-base duration-150">
          Pay after receive product.
        </p>

        <div className="py-2 flex gap-3 mb-4">
          <PaymentOption text={"Cash on Delivery"} value={"cash-on-delivery"}>
            <SquareImage img={cashOnDeliveryOptionImg} />
          </PaymentOption>
        </div>

        <Br />

        {/** mobile banking */}
        <h3 className="text-sm s280:text-base s410:text-lg font-semibold text-[#555555] mt-3">
          Mobile Wallet
        </h3>
        <p className="text-[#777777] mb-2 text-xs s280:text-sm s410:text-base duration-150">
          Pay with mobile wallet.
        </p>

        <div className="py-2 flex gap-3 mb-4 flex-wrap">
          <PaymentOption text="Bkash" value={"bkash"}>
            <SquareImage img={bkashOptionImg} />
          </PaymentOption>

          <PaymentOption text="Nogod" value={"nogod"}>
            <SquareImage img={nogodOptionImg} />
          </PaymentOption>

          <PaymentOption text="Upday" value="upay">
            <SquareImage img={upayOptionImg} />
          </PaymentOption>

          <PaymentOption text="Roket" value="roket">
            <SquareImage img={roketOptionImg} />
          </PaymentOption>
        </div>
        <Br />

        {/** debit and cradit card */}
        <h3 className="text-sm s280:text-base s410:text-lg font-semibold text-[#555555] mt-3">
          Debit <span className="text-xs">/</span> Cradit Cards
        </h3>
        <p className="text-[#777777] mb-2 text-xs s280:text-sm s410:text-base duration-150">
          Pay with debit or cradit cards.
        </p>

        <div className="mb-4">
          <PaymentOption>
            <div className="w-full s320:w-52">
              <Image
                width={500}
                height={500}
                className="h-full"
                src={craditAndDebitCardOptionImg}
                alt="paymant-option-img"
              />
            </div>
          </PaymentOption>
        </div>

        <Br />

        <div className="my-4">
          <label className="cursor-pointer flex items-center gap-2 text-[#666666] text-xs s280:text-sm s650:text-base duration-150">
            <span>
              <CheckBox
                value="agreement"
                name="agreement"
                id="payment-agreement"
              />
            </span>
            <span className="select-none">
              By proceeding, you agree to our{" "}
              <Link
                href="#terms-and-condition"
                className="cursor-pointer hover:border-b-[0.5px] border-primary text-primary"
                scroll={false}
              >
                terms and conditions.
              </Link>
            </span>
          </label>
        </div>

        <div className="flex justify-end">
          <button className="text-xs s280:text-sm s650:text-base px-3 py-2 text-white bg-primary rounded-sm">
            Conirm Order 328 $
          </button>
        </div>
      </div>
    </div>
  );
}

function Br() {
  return <div className="h-[1px] bg-[#dddddd]"></div>;
}

function SquareImage({ img }) {
  return (
    <div className="size-5 s220:size-6 s240:size-8 s280:size-10 duration-150 shrink-0">
      <Image
        width={500}
        height={500}
        className="h-full"
        src={img}
        alt="paymant-option-img"
      />
    </div>
  );
}

export default PaymentMethod;
