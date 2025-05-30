"use client";

import {
  MenuIcon,
  MessageCircleQuestion,
  MessageSquare,
  PhoneIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { twMerge } from "tailwind-merge";
import useScreenSize from "@/hooks/useScreenSize";
import { useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import clsx from "clsx";
import { activePathName, menus } from "@/contants/navigation";
import { cn } from "@/lib/utils";

const NavBar = ({ isBottomNavgation }: { isBottomNavgation: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { breakpoint } = useScreenSize();
  const [open, setOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 80 && scrollY > lastScrollY.current) {
        setIsHidden(true);
      } else if (scrollY < lastScrollY.current) {
        setIsHidden(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pengaduanMessage = encodeURIComponent(
    "Halo, saya ingin menyampaikan pengaduan terkait produk air mineral.\n\nNama: \nNomor HP: \nJenis Produk: \nTanggal Pembelian: \nKeluhan: \n\nMohon bantuannya, terima kasih."
  );

  const contactMessage = encodeURIComponent(
    "Halo, saya ingin bertanya mengenai produk air mineral. Mohon informasinya lebih lanjut. Terima kasih."
  );

  const pengaduanUrl = `https://wa.me/6285255565306?text=${pengaduanMessage}`;
  const contactUrl = `https://wa.me/6285255565306?text=${contactMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setIsBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={"pt-20"}>
      {breakpoint === "sm" || breakpoint === "md" ? (
        <>
          <div
            className={cn(
              isBottomNavgation
                ? isHidden
                  ? "opacity-0 translate-y-5"
                  : "opacity-100 translate-y-0"
                : "grid grid-cols-6",
              "justify-around items-center py-3 fixed px-5 z-50 w-screen bg-white/70 backdrop-blur-md -mt-20 transition-all duration-300 ease-in-out"
            )}
          >
            {!isBottomNavgation && (
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="relative w-5 h-5 flex items-center justify-center"
              >
                <div
                  className={twMerge(
                    "absolute transition-transform duration-300",
                    open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
                  )}
                >
                  <MenuIcon className="w-6 h-6" />
                </div>
                <div
                  className={twMerge(
                    "absolute transition-transform duration-300",
                    open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
                  )}
                >
                  <XIcon className="w-6 h-6" />
                </div>
              </div>
            )}
            <div className="col-span-4 ">
              <div
                className="flex justify-center items-center gap-3 cursor-pointer scale-125 duration-300"
                onClick={() => {
                  router.push("/");
                }}
              >
                <Image
                  src="/assets/image/logo.png"
                  width={1000}
                  height={1000}
                  alt="Logo"
                  className="h-14 w-24"
                />
              </div>
            </div>
          </div>
          {open && (
            <Drawer direction="left" open={open} onOpenChange={setOpen}>
              <DrawerContent className="left-0 w-[80%] h-full rounded-none bg-white shadow-lg">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="flex justify-center">
                      <Image
                        src="/assets/image/logo.png"
                        width={1000}
                        height={1000}
                        alt="Logo"
                        className="h-20 w-36"
                      />
                    </DrawerTitle>
                  </DrawerHeader>
                  <nav className="px-4 space-y-1">
                    {menus.map((menu, index) => (
                      <Link key={index} href={menu.slug}>
                        <Button
                          variant="ghost"
                          className={clsx(
                            "w-full justify-start text-sm",
                            activePathName[pathname] === menu.slug
                              ? "text-primary-blue"
                              : "text-gray-900"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {menu.name}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </>
      ) : (
        <div
          className={cn(
            isHidden ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0",
            "grid grid-cols-3 justify-around items-center py-3 fixed z-50 w-screen bg-white/70 backdrop-blur-md shadow-md -mt-20"
          )}
        >
          <div
            className="flex justify-center items-center gap-3 cursor-pointer hover:scale-125 duration-300"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/assets/image/logo.png"
              width={1000}
              height={1000}
              alt="Logo"
              className="h-14 w-24"
            />
          </div>
          <ul className="flex justify-center gap-10">
            {menus.map((menu, idx) => {
              return (
                <li key={idx}>
                  <Link
                    className={twMerge(
                      "text-white cursor-pointer relative group",
                      activePathName[pathname] === menu.slug
                        ? "text-primary-blue"
                        : "text-gray-900"
                    )}
                    href={menu.slug}
                  >
                    {menu.name}
                    <div
                      className={twMerge(
                        "border-b-2 py-3 border-transparent duration-300 -mx-2 group-hover:border-primary-blue absolute inset-0",
                        activePathName[pathname] === menu.slug
                          ? "text-primary-blue border-b-2 py-3 border-primary-blue"
                          : "text-gray-900"
                      )}
                    ></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`fixed z-50 right-5 md:right-10 cursor-pointer hover:scale-125 duration-300 transition-all justify-center items-center flex flex-row ${
              isBottom
                ? "bottom-48 md:bottom-[345px]"
                : "bottom-40 md:bottom-28"
            }`}
            onClick={() => window.open(pengaduanUrl, "_blank")}
          >
            <div className="bg-[#25D366] rounded-lg">
              <div className="p-2.5 border-white rounded-full">
                <MessageSquare className="text-white" size={40} />
              </div>
            </div>
            <div className="bg-[#25D366] -ml-2 px-2 py-1 rounded-lg">
              <p className="text-white text-xs">Pengaduan</p>
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>Pengaduan</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`fixed z-50 right-5 md:right-10 cursor-pointer hover:scale-125 duration-300 transition-all justify-center items-center flex flex-row ${
              isBottom
                ? "bottom-28 md:bottom-[270px]"
                : "bottom-20 md:bottom-10"
            }`}
            onClick={() => window.open(contactUrl, "_blank")}
          >
            <div className="flex">
              <div className="bg-[#25D366] rounded-full p-2">
                <div className="p-2.5 border-2 border-white rounded-full">
                  <PhoneIcon className="text-white" size={20} />
                </div>
              </div>
            </div>
            <div className="bg-[#25D366] -ml-2 px-2 py-1 rounded-lg">
              <p className="text-white text-xs">Contact Us</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Contact us</p>
        </TooltipContent>
      </Tooltip>
    </nav>
  );
};

export default NavBar;
