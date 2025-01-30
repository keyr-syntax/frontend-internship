import LoginForm from "../form/Login-form";
import LoginImg from "../../assets/login.jpg";
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full max-h-screen ">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <div className="w-1/2 h-full hidden lg:block">
        <img src={LoginImg} alt="Login Image" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
