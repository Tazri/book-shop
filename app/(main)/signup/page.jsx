import SignUpForm from "@/components/signupPage/SignUpForm";
import SignUpIllustrator from "@/components/signupPage/SignUpIllustrator";

function SignUpPage() {
  return (
    <div className="flex-grow mx-auto container flex p-1 my-3 flex-col lg:flex-row gap-3 items-center">
      <SignUpForm />
      {/** img */}
      <div className=" flex-grow w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto -order-1 lg:order-none">
        <div className="max-w-lg lg:max-w-2xl mx-auto my-4">
          <SignUpIllustrator />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
