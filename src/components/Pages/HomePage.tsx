import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../Navbar";
import Ripple from "../Ripple";
import { Badge } from "../ui/badge";
import { Button } from "../ui/moving-border";
import { Pricing } from "../landing/pricing";
import { TestimonialsSection } from "../landing/testimonialSection";
import { FAQSection } from "../landing/faq";
import { FeaturesSection } from "../ui/featureSection";
import { Footer } from "../landing/footer";

const HomePage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="container mx-auto">
      <motion.section
        className="relative flex items-center justify-center h-screen flex-col gap-4 md:w-11/12 w-full overflow-hidden"
        id="home"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Ripple />
        <Navbar />
        <motion.div
          className="container mx-auto w-full min-h-screen flex flex-col justify-center items-center"
          style={{ y }}
        >
          <motion.div variants={itemVariants} className="relative z-10">
            <Badge
              variant="secondary"
              className="p-2 border-2 border-secondary text-secondary-foreground mb-4 backdrop-blur-sm"
            >
              World&apos;s most adapted healthcare AI
            </Badge>
          </motion.div>

          <motion.h1
            variants={textVariants}
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600"
          >
            Your Personal AI Therapist
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-2xl text-center mt-2 font-raleway text-gray-400 italic max-w-5xl backdrop-blur-sm"
          >
            Redefining Therapy for the Digital Age. Chat with your AI therapist, reflect on your
            emotions, and take small steps toward a calmer mind.
          </motion.p>

          <motion.div className="mt-8" variants={itemVariants}>
            <Link to="/chat">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  borderRadius="0.5rem"
                  className="border-neutral-200 dark:border-slate-800 relative z-10 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-900 hover:from-blue-600 hover:to-purple-800  "
                >
                  ✨ Begin Your Wellness Journey ✨
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="py-16"
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="rounded-full px-4 py-1 mb-4">
              Features
            </Badge>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Unlock Peace and Clarity with Calmify
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience the power of Calmify, your AI-powered mental health companion. Our platform
            offers a range of features designed to help you manage your emotions, reflect on your
            experiences, and take small steps toward a calmer mind.
          </motion.p>
        </div>

        <motion.div
          className="-mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <FeaturesSection />
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Pricing />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <TestimonialsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <FAQSection />
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
};

export default HomePage;
