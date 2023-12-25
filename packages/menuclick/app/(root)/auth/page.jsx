/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Background from "@/components/ui/Background";
import Link from "next/link";

const Authentication = () => {
  return (
    <div className="fixed grid place-items-center top-0 right-0 left-0 z-50 w-full inset-0 h-full justify-center items-center">
      <Background />
      <div className="relative container m-auto px-6">
        <div className="m-auto md:w-7/12">
          <div className="rounded-xl bg-white dark:bg-black shadow-xl shadow-[#3a31316f]">
            <div className="p-8">
              <div className="space-y-4">
                <Image
                  src="https://www.svgrepo.com/show/475643/dribbble-color.svg"
                  loading="lazy"
                  width={10}
                  height={10}
                  className="w-10"
                  alt="google logo"
                />
                <h2 className="mb-8 text-2xl text-gray-900 dark:text-white font-bold">
                  Ready to Dive In? <br /> Let's Get Started!
                </h2>
              </div>
              <div className="mt-10 grid space-y-4">
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <Image
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                      width={5}
                      height={5}
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>
              <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-300 text-center ">
                <p className="text-xs">
                  By proceeding, you agree to our
                  <Link
                    href="/term-policy"
                    className="underline hover:text-blue-600"
                  >
                    Terms of Use
                  </Link>
                  and confirm you have read our
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-blue-600"
                  >
                    Privacy and Cookie Statement
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
