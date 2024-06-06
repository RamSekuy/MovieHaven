"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function NavbarToggler() {
  return (
    <nav className="w-full flex sticky top-0 z-50">
      <Navbar />
    </nav>
  );
}

function Navbar({ className }: { className?: string }) { 
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`w-full rounded-md border border-transparent bg-gradient-to-r from-oldblue via-navy to-oldblue shadow-input px-4 py-4 md:px-6 ${className}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logoMovie.png" alt="logo" width={200} height={300} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <Link href="/nowShowing" className="text-white mx-5 hover:font-semibold">
            Now Playing
          </Link>
          <Link href="/upComing" className="text-white mx-5 hover:font-semibold">
            Up Coming
          </Link>
          <Link href="/login" className="text-white mx-5 hover:font-semibold">
            Login
          </Link>
          <Link href="/register" className="text-white mx-5 hover:font-semibold">
            Register
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
          <button className="focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <Image src="/menu1.svg" alt="menu" width={30} height={30} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden mt-2 bg-slate-400 p-4 rounded-md shadow-lg">
          <div className="flex flex-col gap-5 items-center">
            <Link href="/nowShowing" className="text-white">
              Now Playing
            </Link>
            <Link href="/upComing" className="text-white">
              Up Coming
            </Link>
            <Link href="/login" className="text-white">
              Login
            </Link>
            <Link href="/register" className="text-white">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
