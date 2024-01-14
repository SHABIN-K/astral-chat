"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Sling as Hamburger } from "hamburger-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState, useEffect, useRef } from "react";

import { ThemeSwitcher } from "./ui";
import { ConfirmModal } from "./modal";
import { onSignOut } from "@/utils/tools";
import { Avathar, Logo } from "@/public/assets";
import { navItems, navlinks } from "@/utils/constants";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuRef, buttonRef]);

  return (
    <nav className="bg-color border-b-2 border-color rounded-b-lg w-full">
      <div className="mx-auto  px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div
            className="absolute inset-y-0 left-0 flex items-center sm:hidden"
            ref={buttonRef}
          >
            <Hamburger toggled={open} toggle={setOpen} rounded />
          </div>
          <div className="flex-center flex-1 sm:justify-start">
            <Link href="/dashboard" className="flex flex-shrink-0 items-center">
              <Logo size={40} />
            </Link>
            <div className="hidden sm:ml-10 sm:block">
              <div className="flex space-x-4">
                {navlinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={`rounded-lg px-5 py-2 ${
                      pathname === item.link && "border-b-2 border-color"
                    } `}
                  >
                    <span className="text-color text-md font-medium">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative rounded-full p-2">
              <ThemeSwitcher />
            </div>

            <Menu as="div" className="relative ml-3">
              <Menu.Button className="relative flex rounded-full bg-color text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Image
                  className="h-8 w-8 rounded-full"
                  width={32}
                  height={32}
                  src={session?.user?.image || Avathar}
                  alt="user profile"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none pb-2 px-1">
                  <div className="flex justify-start items-center flex-row p-2 space-x-1 border-color border-b w-full mb-1">
                    <Image
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                      src={session?.user?.image || Avathar}
                      alt="user profile"
                    />
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                  </div>
                  {navItems.map((item) => (
                    <Menu.Item key={item.id}>
                      {({ active }) => (
                        <div
                          onClick={() => {
                            item.link === null
                              ? setIsOpen(true)
                              : router.push(item.link);
                          }}
                          className={`
                      ${active ? "bg-gray-100 text-black" : "text-color"}
                      block px-4 py-2 text-sm text-gray-700 rounded-xl
                    `}
                        >
                          {item.name}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <div
        className={`top-0 absolute sm:hidden bg-color w-full border border-color flex-center rounded-lg p-2 backdrop-blur-sm shadow-xl  z-10 transition-transform duration-1000 ${
          open ? "translate-y-20" : "-translate-y-full"
        }`}
        ref={menuRef}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col w-full">
          {navlinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`rounded-lg px-5 py-2 ${
                pathname === item.link
                  ? "bg-btncolor text-btncolor"
                  : "text-color"
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="text-md font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={setIsOpen}
        onConfirm={() => onSignOut(setIsLoading)}
        isLoading={isLoading}
        title="Sign out"
        btnLabel="Sign out"
      />
    </nav>
  );
};

export default Header;
