import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Ripple from "../Ripple";
import { Badge } from "../ui/badge";
import { Button } from "../ui/moving-border";

const HomePage = () => {
  return (
    <>
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

      <section
        className=" flex h-screen flex-col gap-4 md:w-11/12 w-full overflow-hidden"
        id="about"
      >
        <div className="container mx-auto  w-full min-h-screen flex flex-col justify-center items-center ">
          <Badge
            variant="secondary"
            className="p-2 border-2 border-secondary text-secondary-foreground mb-4"
          >
            About Us
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center tracking-wide">
            Unlock Peace and Clarity with{" "}
            <span className=" font-stint">AI Therapy.</span>
          </h1>
          <p className="text-2xl text-center mt-2 font-raleway text-gray-500 italic">
            Experience the power of Calmify, your AI-powered mental health
            companion. Our platform offers a range of features designed to help
            you manage your emotions, reflect on your experiences, and take
            small steps toward a calmer mind.
          </p>

          <div className="mt-12 flex gap-4 flex-wrap justify-center cursor-pointer">
            <div className="block max-w-sm p-6  rounded-lg shadow-sm border-neutral-200 dark:border-slate-800 hover:bg-neutral-50 dark:bg-slate-900 dark:hover:bg-slate-800">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                AI-Guided Conversations
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-4">
                Engage in supportive chats with your AI therapist. Calmify
                listens, provides advice, and helps you navigate through stress
                and emotions—anytime, anywhere.
              </p>
            </div>

            <div className="block max-w-sm p-6 rounded-lg shadow-sm border-neutral-200 dark:border-slate-800 hover:bg-neutral-50 dark:bg-slate-900 dark:hover:bg-slate-800">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mood Tracking Made Easy
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Track your emotions effortlessly and visualize trends over time.
                Discover insights into your mental health patterns and take
                control of your well-being.
              </p>
            </div>

            <div className="block max-w-sm p-6 rounded-lg shadow-sm border-neutral-200 dark:border-slate-800 hover:bg-neutral-50 dark:bg-slate-900 dark:hover:bg-slate-800">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mindful Activities and Habits
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Access tailored mindfulness activities, breathing techniques,
                and guided journeying to help you build calming, healthy habits
                that fit your lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
