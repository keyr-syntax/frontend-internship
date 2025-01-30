import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Ripple from "../Ripple";
import { Badge } from "../ui/badge";
import { Button } from "../ui/moving-border";
// import { Button } from "../ui/button";

const HomePage = () => {
  return (
    <section
      className="relative flex items-center justify-center h-screen flex-col gap-4 md:w-11/12 w-full overflow-hidden"
      id="home"
    >
      <Ripple />
      <Navbar />
      <div className="container mx-auto  w-full min-h-screen flex flex-col justify-center items-center ">
        <Badge
          variant="secondary"
          className="p-2 border-2 border-secondary text-secondary-foreground mb-4"
        >
          World&apos;s most adapted healthcare AI
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center tracking-wide">
          Your Personal AI Therapist
        </h1>
        <p className="text-2xl text-center mt-2 font-raleway text-gray-500 italic">
          Redefining Therapy for the Digital Age
        </p>
        {/* <Button className="font-pontanoSans cursor-pointer  z-10 bg-black mt-8" size="lg">
          ✨ Begin Your Wellness Journey ✨
        </Button> */}
        <div className="mt-8">
          <Link to="/chat">
            <Button
              borderRadius="0.75rem"
              className=" border-neutral-200 dark:border-slate-800 relative z-10 hover:opacity-85 cursor-pointer"
            >
              ✨ Begin Your Wellness Journey ✨
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
