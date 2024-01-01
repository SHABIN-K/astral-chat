import { Transition, Popover } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const PopOver = ({
  post,
  setEditIsOpen,
  setDeleteShop,
  styleShopCard,
  setShop,
}) => {
  return (
    <Popover as="div" className="relative">
      <Popover.Button className="absolute right-0 flex rounded-full outline-none">
        <EllipsisVerticalIcon className="icon" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="flex flex-col absolute right-0 z-10 mt-4 w-32 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
          <p className={styleShopCard.menu} onClick={() => handleEditBtn(post)}>
            Edit
          </p>
          <p
            className={styleShopCard.menu}
            onClick={() => handleDeleteBtn(post)}
          >
            Delete
          </p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopOver;
