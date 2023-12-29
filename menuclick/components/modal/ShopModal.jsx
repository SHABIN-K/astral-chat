"use client";

import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";

import { FormButtons, WaitingLoader } from "../ui";

const ShopModal = ({
  isOpen,
  setIsOpen,
  title,
  btnLabel,
  handleBtn,
  isLoading,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/25 dark:bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
          <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white dark:bg-gray-800 py-2 transition-all cursor-default pointer-events-auto mx-auto relative shadow-xl">
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 ">
                  <XMarkIcon
                    className="text-color rounded-full p-1 hover:bg-gray-50 dark:hover:bg-gray-700 text-lg  cursor-pointer w-6 "
                    onClick={closeModal}
                  />
                </div>

                <div className="space-y-2 p-2">
                  <div className="p-2 space-y-2 text-start text-color">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold tracking-tight"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                </div>

                <div className="flex justify-end items-end px-3 py-2">
                  <FormButtons
                    mainClass="flex space-x-2"
                    primaryClass="btn_form"
                    secondaryClass="btn_form"
                    secondaryLabelClass="flex items-center"
                    primaryLabelClass="flex items-center"
                    primaryLabel={
                      isLoading ? (
                        <WaitingLoader size={15} color="#fffff" />
                      ) : (
                        btnLabel
                      )
                    }
                    secondaryLabel="cancel"
                    onPrimaryClick={handleBtn}
                    onSecondaryClick={closeModal}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShopModal;
