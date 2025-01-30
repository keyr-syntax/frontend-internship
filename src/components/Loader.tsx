import { Loader2 } from "lucide-react";

const Loader = ({ size = 12 }: { size?: number }) => {
  return <Loader2 className={`size-${size}  animate-spin`} />;
};

export default Loader;
