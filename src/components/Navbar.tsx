import { Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ScrollIntoView from "react-scroll-into-view";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getStoredUser, logout, User } from "@/lib/auth";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getStoredUser().then(setUser);
  }, []);

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
  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

        <nav className="hidden md:flex items-center justify-between flex-grow">
          <div className="ml-8 flex gap-6">
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="#home"
            >
              Home
            </Link>

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

          {!user ? (
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
          ) : (
            <div className="p-3 border-t mt-auto">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger className=" w-full h-full">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm">{user?.username}</span>
                  </div>
                </DialogTrigger>
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
          )}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
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

              {!user ? (
                <div className="flex flex-col gap-4 mt-4">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="lg" className="w-full">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="default" size="lg" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="p-3 border-t mt-auto">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger className=" w-full h-full">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 text-sm">{user?.username}</span>
                      </div>
                    </DialogTrigger>
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
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
