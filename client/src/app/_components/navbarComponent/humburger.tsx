"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Humburger({
  hrefList = [],
}: {
  hrefList: { text: string; url: string }[];
}) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [burger, setBurger] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setBurger(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={`flex flex-col items-end h-full w-max`}>
      <button
        className="md:hidden self-end h-full font-semibold  aspect-square relative flex justify-center items-center *:*:transition-all"
        onClick={() => setBurger(!burger)}
      >
        {!burger ? (
          <>
            <Image src="/menu1.svg" alt="menu" width={30} height={30} />
          </>
        ) : (
          <>Close </>
        )}
      </button>

      <ul
        className={`md:h-full items-center flex-col md:flex-row md:flex md:gap-5 md:static bg-gray-400 md:bg-transparent
        ${!burger ? "hidden" : "flex absolute top-[60px] right-0 rounded-lg "}`}
      >
        {hrefList.map((e, i) => (
          <li className="h-full w-full text-white font-semibold py-2" key={i}>
            <Link
              className={`w-full h-full text-end px-2 ${
                pathname == e.url ? "text-gray-600 bg-white rounded-lg pt" : ""
              } hover:text-gray-600 hover:bg-white flex justify-center items-center rounded-lg`}
              href={e.url}
              onClick={() => setBurger(false)}
            >
              <p className="w-full text-nowrap text-center">{e.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
