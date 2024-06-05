"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function NavbarToggler() {
  return (
    <nav className="w-full flex  sticky top-0 z-50">
      <Navbar className=" " />
    </nav>
  );
}

function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative w-full rounded-md boder border-transparent bg-gradient-to-r  from-oldblue via-navy to-oldblue  shadow-input flex flex-row
      space-x-4 px-4 sm:4 md:px-6 py-4 "
    >
      <div className="hidden lg:block w-full ">
        <div className=" flex flex-row justify-between w-full ">
          <div className="flex flex-row items-center gap-5">
            <div className=" right-0 left-0 flex  items-center justify-center">
              <a href="/">
                <Image
                  src="/logoMovie.png"
                  alt="logo"
                  width={200}
                  height={300}
                />
              </a>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <Link href={"/nowShowing"}>
                <button className="text-white mx-5 hover:font-semibold ">
                  Now Playing
                </button>
              </Link>

              <Link href={"/upComing"}>
                <button className="text-white mx-5 hover:font-semibold">
                  Up Coming
                </button>
              </Link>
            </div>
          </div>{" "}
          {/* flex flex-row items-center */}
          <div className="flex flex-row items-center">
            <Link href={"/login"}>
              <button className="text-white mx-5 hover:font-semibold">
                Login
              </button>
            </Link>

            <Link href={"/register"}>
              <button className="text-white mx-5 hover:font-semibold">
                Resgister
              </button>
            </Link>
          </div>
        </div>{" "}
        {/* flex flex-row justify-between w-full */}
      </div>
      <div className="lg:hidden flex items-center justify-between">
        <button
          className="focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src="/menu1.svg" alt="menu" width={30} height={30} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="/">
            <Image src="/logoMovie.png" alt="logo" width={200} height={300} />
          </a>
        </div>
      </div>

      {isOpen && (
        <div className=" sticky h-[200px] lg:hidden bg-slate-400   ">
          <div className="flex flex-col gap-5 items-center">
            <Link href={"/nowShowing"}>
              <button className="text-white mx-5">Now Playing</button>
            </Link>

            <Link href={"/upComing"}>
              <button className="text-white mx-5">Up Coming</button>
            </Link>

            <Link href={"/login"}>
              <button className="text-white ">Login</button>
            </Link>

            <Link href={"/register"}>
              <button className="text-white ">Resgister</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
