import { TfiTruck } from "react-icons/tfi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { RxReload } from "react-icons/rx";

function HomeFeatured() {
  return (
    <div className="container my-8 mx-auto hidden gap-5 justify-center items-center s500:flex">
      <FeatureCard
        Icon={LiaMoneyBillWaveSolid}
        title="Cash on Delivery"
        text="Pay cash at your doorstep"
      />

      <FeatureCard
        Icon={TfiTruck}
        title="Delevery"
        text="All over Bangladesh"
      />

      <FeatureCard
        Icon={RxReload}
        title="Happy Return"
        text="7 days return facility"
      />
    </div>
  );
}

function FeatureCard({ Icon = TfiTruck, title, text }) {
  return (
    <div className="flex items-center gap-3 s550:gap-2 text-[#333333]">
      <div className="text-xl s550:text-3xl duration-200">
        <Icon />
      </div>

      <div>
        <h2 className="uppercase text-xs s550:text-sm duration-200">{title}</h2>
        <p className="text-[0.5rem] s550:text-[0.74rem] text-[#666666] duration-200">
          {text}
        </p>
      </div>
    </div>
  );
}

export default HomeFeatured;
