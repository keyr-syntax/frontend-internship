import signUpImage from "@/assets/signup.jpg";
import RegisterForm from "../form/Register-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-full max-h-screen">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={signUpImage}
          alt="Signup Image"
          width={1200}
          height={1200}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
