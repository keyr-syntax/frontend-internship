"use client";

import { Menu } from "lucide-react";
// import Link from "";
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
      className={`h-16 flex items-center justify-between font-railway transition-all duration-300  mx-auto fixed top-0 left-0 right-0 z-50 rounded-xl ${
        isScrolled ? "w-9/12 top-6 backdrop-blur-2xl py-2 px-4 bg-white/10" : "w-11/12"
      }`}
    >
      <Link className="w-56 " to="/">
        {/* <img src={"/logo.png"} alt="logo" width={240} height={240} className="mt-2" /> */}
        <span className="text-2xl font-stint  ml-2">AI Therapy.</span>
      </Link>
      <nav className=" font-raleway flex items-center justify-between w-full">
        <div className=" ml-4 hidden md:flex gap-4 sm:gap-6 items-start justify-center">
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
        <div className="flex items-stretch justify-normal gap-3">
          <Link to="/register">
            <Button variant="ghost" size="default">
              Register{" "}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="default" size="default">
              Login{" "}
            </Button>
          </Link>
        </div>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle>{"  "}</SheetTitle>
          <nav className="flex flex-col gap-4">
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="#"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              className="text-md font-medium hover:underline underline-offset-4"
              to="#"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
