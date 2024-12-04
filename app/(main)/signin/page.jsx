import SignInForm from "@/components/signInPage/SignInForm";
import SingInllustratorSvg from "@/components/signInPage/SingInllustratorSvg";

function SingInPage() {
  return (
    <div className="flex-grow mx-auto container flex p-1 my-3 flex-col lg:flex-row gap-3 items-center">
      <SignInForm />
      {/** img */}
      <div className="flex-grow w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto -order-1 lg:order-none">
        <div className="max-w-lg lg:max-w-2xl mx-auto my-4">
          <SingInllustratorSvg />
        </div>
      </div>
    </div>
  );
}

export default SingInPage;
