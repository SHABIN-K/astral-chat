"use client";

import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { useDeleteModalStore, useEditModalStore } from "@/utils/state";

const PopOver = ({ post, setShop }) => {
  const { onOpen: editOpen } = useEditModalStore();
  const { onOpen: deleteOpen } = useDeleteModalStore();

  const handleEditBtn = (post) => {
    setShop(post);
    editOpen();
  };

  const handleDeleteBtn = (post) => {
    setShop(post);
    deleteOpen(true);
  };

  const stylePopover = {
    menu: "hover:bg-gray-200 dark:hover:bg-gray-500 p-1 text-sm md:text-xs rounded-lg",
  };

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
          <p className={stylePopover.menu} onClick={() => handleEditBtn(post)}>
            Edit
          </p>
          <p
            className={stylePopover.menu}
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
