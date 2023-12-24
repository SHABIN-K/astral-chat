import Link from "next/link";
import React from "react";
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="left-0 bottom-0 w-full fixed h-[3rem] border-t-2 border-black dark:border-gray-50 flex items-center justify-between bg-white dark:bg-black">
      <Link href="/" className="ml-5 font-semibold text-lg ">
        <h1>MenuCLick</h1>
      </Link>
      <div className="flex gap-4 mr-5 items-center h-full">
        <Link href="https://twitter.com/Shabink9/" target="_blank">
          <FaTwitter size={25} />
        </Link>
        <Link href="https://www.instagram.com/_shabink/" target="_blank">
          <FaInstagram size={25} />
        </Link>
        <Link href="https://github.com/SHABIN-K" target="_blank">
          <FaGithub size={25} />
        </Link>
        <Link href="https://t.me/ericdaniyel" target="_blank">
          <FaTelegram size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
