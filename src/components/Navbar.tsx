import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Button } from "./ui/button";
import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ScrollIntoView from "react-scroll-into-view";
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
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`h-16 flex items-center justify-between font-railway transition-all duration-300 mx-auto fixed top-0 left-0 right-0 z-50 px-4 w-screen bg-slate-900/20 md:bg-transparent ${
          isScrolled
            ? "md:w-9/12 md:top-6 backdrop-blur-2xl py-2 bg-white/10"
            : "md:w-11/12 w-full"
        }`}
      >
        <Link className="flex-shrink-0" to="/">
          <span className="text-2xl font-stint">Calmify</span>
        </Link>

        <nav className="hidden lg:flex items-center justify-between flex-grow  ">
          <div className="ml-8 flex gap-6">
            <ScrollIntoView
              smooth={true}
              scrollOptions={{
                behavior: "smooth",
                block: "start",
                inline: "start",
              }}
              selector="#about"
            >
              <Link
                className="text-md font-medium hover:underline underline-offset-4"
                to="#about"
              >
                About
              </Link>
            </ScrollIntoView>
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="/chat"
            >
              Chat with AI
            </Link>
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="/mood_tracking"
            >
              Mood Tracking
            </Link>
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>
          {user === null && (
            <div className="flex items-center gap-1 ml-2">
              <Link to="/register">
                <Button variant="ghost" size="default">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="default" size="default">
                  Login
                </Button>
              </Link>
            </div>
          )}
          {user !== null && (
            <div
              onClick={() => {
                navigate("/chat");
              }}
              className="flex items-center "
            >
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          )}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetTitle className="text-left text-2xl font-stint mb-8">
              Calmify
            </SheetTitle>
            <nav className="flex flex-col gap-6">
              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                to="#home"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                to="#about"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
                to="/chat"
              >
                Chat with AI
              </Link>
              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
                to="/mood_tracking"
              >
                Mood Tracking
              </Link>
              <Link
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsOpen(false)}
                to="/dashboard"
              >
                Dashboard
              </Link>

              {user === null && (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/register">
                    <Button variant="ghost" size="default">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="default" size="default">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
              {user !== null && (
                <div
                  onClick={() => {
                    navigate("/chat");
                  }}
                  className="flex items-center"
                >
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="p-3 border-t mt-auto">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Logout</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  Are you sure you want to log out?
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
