import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <>
      <p className="flex flex-row mt-8 mx-auto w-[80%] justify-center items-center sm:max-w-[300px] text-[18px] text-center rounded">
        <Copyright size={25} /> 2025 Calmify
      </p>
      <p className="my-2 mb-8 mx-auto w-[50%] sm:max-w-[300px] text-[18px]  gap-1 text-center rounded">
        All Rights Reserved
      </p>
    </>
  );
}
