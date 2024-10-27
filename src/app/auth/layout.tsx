import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Say hello to Feegle, your smart feedback partner!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          We're making customer feedback feel like coffee chat conversations...{" "}
          <br />
          something wonderfully different 😄
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
