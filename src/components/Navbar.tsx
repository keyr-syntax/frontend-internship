import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollIntoView from "react-scroll-into-view";
import { LogOut, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { AuthContext } from "@/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    initial: {
      backgroundColor: "rgba(15, 23, 42, 0)",
      backdropFilter: "blur(0px)",
    },
    scrolled: {
      backgroundColor: "rgba(15, 23, 42, 0.3)",
      backdropFilter: "blur(12px)",
      transition: {
        duration: 1.4,
      },
    },
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate={isScrolled ? "scrolled" : "initial"}
        className={`h-16 flex items-center justify-between font-railway fixed top-0 left-0 right-0 z-50 px-4 w-screen transition-all duration-300 ${
          isScrolled
            ? "md:w-10/12 md:top-6 md:mx-auto md:rounded-2xl border border-white/10"
            : "md:w-11/12 md:mx-auto"
        }`}
      >
        <Link to="/" className="flex-shrink-0 relative group">
          <motion.span
            className="text-2xl font-stint bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calmify
          </motion.span>
          <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
        </Link>

        <nav className="hidden lg:flex items-center justify-between flex-grow">
          <motion.div
            className="ml-8 flex gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              { to: "#about", text: "About" },
              { to: "/chat", text: "Chat with AI" },
              { to: "/mood_tracking", text: "Mood Tracking" },
              { to: "/dashboard", text: "Dashboard" },
            ].map((item, index) => (
              <motion.div key={index} variants={navItemVariants}>
                {item.to.startsWith("#") ? (
                  <ScrollIntoView
                    smooth={true}
                    scrollOptions={{
                      behavior: "smooth",
                      block: "start",
                      inline: "start",
                    }}
                    selector={item.to}
                  >
                    <Link className="text-md font-medium relative group" to={item.to}>
                      {item.text}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </ScrollIntoView>
                ) : (
                  <Link className="text-md font-medium relative group" to={item.to}>
                    {item.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
          >
            {user === null ? (
              <>
                <Link to="/register">
                  <Button
                    variant="ghost"
                    size="default"
                    className="hover:bg-white/10 transition-colors duration-300"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="default"
                    size="default"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/chat")}
                className="cursor-pointer"
              >
                <Avatar className="h-8 w-8 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </motion.div>
            )}
          </motion.div>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-gradient-to-b from-slate-900 to-slate-800 border-l border-white/10"
          >
            <SheetTitle className="text-left text-2xl font-stint mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Calmify
            </SheetTitle>
            <nav className="flex flex-col gap-6">
              {[
                { to: "#home", text: "Home" },
                { to: "#about", text: "About" },
                { to: "/chat", text: "Chat with AI" },
                { to: "/mood_tracking", text: "Mood Tracking" },
                { to: "/dashboard", text: "Dashboard" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    className="text-lg font-medium relative group flex items-center"
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                {user === null ? (
                  <div className="flex flex-col gap-3">
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="default" className="w-full hover:bg-white/10">
                        Register
                      </Button>
                    </Link>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="default"
                        size="default"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Avatar
                      className="h-8 w-8 ring-2 ring-white/20"
                      onClick={() => {
                        navigate("/chat");
                        setIsOpen(false);
                      }}
                    >
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-400">Profile</span>
                  </div>
                )}
              </motion.div>
            </nav>
          </SheetContent>
        </Sheet>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-slate-900 border border-white/10">
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">Are you sure you want to log out?</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.header>
      <Outlet />
    </>
  );
};

export default Navbar;
