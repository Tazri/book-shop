import { FiPackage } from "react-icons/fi";
import { LiaCommentSolid } from "react-icons/lia";
import { GoGear } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuPackageCheck } from "react-icons/lu";
import { IoCheckmarkDone } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

function ProfilePage() {
  return (
    <div className="px-1 md:px-4 pb-5 pt-3 border-t-0 md:border-t md:border-t-primary flex-col gap-2 flex duration-150">
      <div className="border p-1 s420:p-2 flex flex-col duration-150">
        <p className="text-xs s320:text-sm s600:text-base text-[#555555] duration-150">
          Welcome Back,
        </p>
        <h3 className="text-lg s250:text-xl s600:text-2xl text-[#333333] duration-150">
          Anms Anonymo
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg s250:text-xl s600:text-2xl text-[#333333] duration-150">
          Orders
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          <StatusBox title="Process" Icon={GoGear} count={12} />
          <StatusBox
            title="Approved"
            Icon={IoMdCheckmarkCircleOutline}
            count={12}
          />
          <StatusBox
            title="On Shipping"
            count={1}
            Icon={LiaShippingFastSolid}
          />
          <StatusBox title="On Shipped" count={5} Icon={LuPackageCheck} />
          <StatusBox title="Completed" count={0} Icon={IoCheckmarkDone} />
          <StatusBox title="Cancelled" count={2} Icon={MdOutlineCancel} />
          <StatusBox title="Returned" count={5} Icon={TbTruckReturn} />
        </div>
      </div>
    </div>
  );
}

function StatusBox({ count = 23, Icon = FiPackage, title = "title" }) {
  return (
    <div className="border flex justify-center items-center flex-col gap-2 size-40 p-3 group duration-150 cursor-pointer rounded-sm">
      <div className="text-xl border size-24 justify-center items-center flex-col flex rounded-full gap-1 bg-[#eeeeee] group-hover:bg-primary group-hover:text-white duration-150 text-[#333333]">
        <span className="text-3xl">
          <Icon />
        </span>
        <span>{count > 100 ? "99+" : count}</span>
      </div>
      <p class="text-base text-[#555555] text-center">{title}</p>
    </div>
  );
}

export default ProfilePage;
