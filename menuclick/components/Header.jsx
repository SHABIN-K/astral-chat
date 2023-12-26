"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

import Hamburger from "./ui/Hamburger";
import { Avathar, Logo } from "@/public/assets";
import { navItems, navlinks } from "@/utils/constants";
import ThemeSwitcher from "./ui/ThemeSwitcher";

const Header = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  return (
    <nav className="bg-color border-b-2 border-color rounded-b-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div
            className="absolute inset-y-0 left-0 flex items-center sm:hidden"
            onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
          >
            <Hamburger />
          </div>
          <div className="flex-center flex-1 sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Logo size={40} />
            </div>
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
            <div className="relative rounded-full  p-2 border ">
              <ThemeSwitcher />
            </div>

            <Menu as="div" className="relative ml-3">
              <Menu.Button className="relative flex rounded-full bg-color text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={Avathar}
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {navItems.map((item) => (
                    <Menu.Item key={item.id}>
                      {({ active }) => (
                        <Link
                          href={item.link}
                          className={`
                      ${active ? "bg-gray-100" : ""}
                      block px-4 py-2 text-sm text-gray-700
                    `}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navlinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`rounded-lg px-5 py-2 ${
                  pathname === item.link && "border-2 border-color"
                } `}
                onClick={() => setIsActive(false)}
              >
                <span className="text-color text-md font-medium">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
