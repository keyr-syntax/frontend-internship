import { Loader2 } from "lucide-react";

const Loader = ({ size = 12 }: { size?: number }) => {
  return <Loader2 className={`size-${size}  animate-spin`} />;
};

export default Loader;


export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}