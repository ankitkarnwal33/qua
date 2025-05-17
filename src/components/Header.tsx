"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-2 shadow-sm relative">
      {/* Logo */}
      <nav>
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            width={120}
            height={50}
            alt="Qua Nutrition"
          />
        </Link>
      </nav>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center text-[#374151] font- text-[15px]">
        <li>
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </li>
        <li>
          <Link href="#section-3" prefetch={false}>
            How it works
          </Link>
        </li>
        <li>
          <Link href="/" prefetch={false}>
            FAQs
          </Link>
        </li>
        <li>
          <Link href={"/auth/login"} prefetch={false}>
            Login
          </Link>
        </li>
        <li>
          <Popover>
            <PopoverTrigger className="border border-[#E2E8F0] px-3 py-2 rounded-sm cursor-pointer">
              Register Now
            </PopoverTrigger>
            <PopoverContent
              className="flex flex-col w-40 mr-3 py-2"
              sideOffset={10}
            >
              <Link
                href={"/auth/signup"}
                className="flex gap-2 items-center "
                prefetch={false}
              >
                <Image
                  src="/icons/user-solid.svg"
                  width={13}
                  height={13}
                  alt="Qua Nutrition"
                />
                <span>Individual</span>
              </Link>
              <Link
                href="/auth/signpart"
                className="flex gap-2 items-center"
                prefetch={false}
              >
                <Image
                  src="/icons/handshake-angle-solid.svg"
                  width={16}
                  height={16}
                  alt="Qua Nutrition"
                />
                <span>Partner</span>
              </Link>
            </PopoverContent>
          </Popover>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-gray-700"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md flex flex-col gap-4 px-6 py-4 md:hidden z-10">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="#section-3" onClick={() => setMobileMenuOpen(false)}>
            How it works
          </Link>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            FAQs
          </Link>
          <Link href={"/auth/login"} onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
          <div>
            <div className="mb-1 font-medium">Register Now</div>
            <div className="flex flex-col border border-[#E2E8F0] rounded px-3 py-2">
              <Link
                href={"/auth/signup"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Individual
              </Link>
              <Link
                href={"/auth/signpart"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
