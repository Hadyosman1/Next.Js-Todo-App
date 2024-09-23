"use client";

import { DeleteTask } from "@/services/serverActions/taskActions";
import { deleteAccount } from "@/services/serverActions/userActions";
import { deleteCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

import { FaTrashCan } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";

type TProps = {
  itemId: number;
  className?: string;
  children: React.ReactNode;
  type: "task" | "account";
  token?: string | undefined | null;
};

const DeleteBtn = ({ itemId, type, className, children, token }: TProps) => {
  const [document, setDocument] = useState<Document | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useLayoutEffect(() => {
    setDocument(window.document);
  }, []);

  const handleDeleteBtnClicked = async () => {
    setIsLoading(true);
    let res;
    if (type === "task") {
      res = await DeleteTask(itemId);
    } else {
      res = await deleteAccount(token ?? "", itemId);
    }
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    if (type === "account") deleteCookie("token");

    toast.success(res.message);
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        <FaTrashCan />
        {children}
      </button>

      {document &&
        createPortal(
          <div
            id="deleteModal"
            tabIndex={-1}
            aria-hidden={!isModalOpen}
            className={`${
              !isModalOpen ? "opacity-0 -translate-y-full" : "opacity-100"
            } overflow-y-auto transition-all duration-300 overflow-x-hidden backdrop-blur-sm flex bg-black/20 fixed z-50 justify-center items-center w-full inset-0 h-modal md:h-full`}
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this {type}?
                </p>

                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    data-modal-toggle="deleteModal"
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>

                  <button
                    disabled={isLoading}
                    onClick={handleDeleteBtnClicked}
                    type="submit"
                    className="py-2 px-3 text-sm font-medium inline-flex items-center justify-center gap-1 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    {isLoading && <VscLoading className="animate-spin" />}
                    {"Yes, I'm sure"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document?.body
        )}
    </>
  );
};

export default DeleteBtn;
