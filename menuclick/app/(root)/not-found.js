import Link from "next/link";
import { Background } from "@/components/ui";

/* eslint-disable react/no-unescaped-entities */
export default function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-color px-4">
      <Background size={10} />
      <div className="text-center">
        <h1 className="text-9xl font-black text-color">404</h1>

        <p className="text-2xl font-bold tracking-tight text-color sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          We can't find that page.
        </p>

        <Link
          href="/"
          className="w-[180px] bg-black dark:bg-white rounded-lg  py-[10px] px-4 
          hover:shadow-lg hover:scale-105 transition duration-500 mt-6 inline-block"
        >
          <span className="text-white dark:text-black font-semibold text-lg ">
            Go Back Home
          </span>
        </Link>
      </div>
    </div>
  );
}
