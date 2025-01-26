import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header
      className={`h-16 flex items-center justify-between font-railway transition-all duration-300 mx-auto fixed top-0 left-0 right-0 z-50 px-4 w-screen bg-slate-900/20 md:bg-transparent ${
        isScrolled ? "md:w-9/12 md:top-6 backdrop-blur-2xl py-2 bg-white/10" : "md:w-11/12 w-full"
      }`}
    >
      {/* LOGO */}
      <Link className="flex-shrink-0" to="/">
        <span className="text-2xl font-stint">AI Therapy.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between flex-grow">
        <div className="ml-8 flex gap-6">
          <Link className="text-md font-medium hover:underline underline-offset-4" to="#home">
            Home
          </Link>
          <Link className="text-md font-medium hover:underline underline-offset-4" to="#about">
            About
          </Link>
          <Link className="text-md font-medium hover:underline underline-offset-4" to="#services">
            Services
          </Link>
          <Link className="text-md font-medium hover:underline underline-offset-4" to="/pricing">
            Pricing
          </Link>
          <Link className="text-md font-medium hover:underline underline-offset-4" to="/faq">
            FAQ
          </Link>
          <Link className="text-md font-medium hover:underline underline-offset-4" to="/contact">
            Contact
          </Link>
        </div>
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
      </nav>

      {/* Mobile Menu Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetTitle className="text-left text-2xl font-stint mb-8">AI Therapy.</SheetTitle>
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
              to="#services"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/pricing"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/faq"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
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
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
