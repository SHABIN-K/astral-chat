"use client";

import { Loader } from "@/components/ui";
import { ShopLayout } from "@/modules/layouts";

const MyMenu = ({ params }) => {
  const { isEffect, currentShop, setCurrentShop } = ShopLayout(params.shopId);

  return (
    <>
      {isEffect ? (
        <div className="sm:mx-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-medium">name</h1>

            <div className="rounded-md px-2 hover:shadow-lg animation-div border border-color">
              {/*<PopOver
            post={currentShop}
            setShop={setCurrentShop}
            button={<EllipsisHorizontalIcon className="icon" />}
            buttonStyle="flex outline-none"
          />*/}
            </div>
          </div>
          <div className="flex-center w-full mt-5">
            {/*<DashCard shopId={currentShop.id} router={router} />*/}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyMenu;
