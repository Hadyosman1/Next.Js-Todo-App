"use client";

import { updateAccountSchema } from "@/schemas/schemas";
import { editAccount } from "@/services/serverActions/userActions";
import { setCookie } from "@/utils/cookies";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

import { FaGear } from "react-icons/fa6";
import { GoPasskeyFill } from "react-icons/go";
import { TbHandStop } from "react-icons/tb";
import { VscLoading } from "react-icons/vsc";

const EditAccountBtn = ({ user }: { user: User }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: user.name,
    email: user.email,
  });

  const [document, setDocument] = useState<Document | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPasswordFieldsShown, setIsPasswordFieldsShown] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setDocument(window.document);
  }, []);

  useLayoutEffect(() => {
    if (!isModalOpen) {
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        name: user.name,
        email: user.email,
      });

      setIsPasswordFieldsShown(false);
    }
  }, [isModalOpen]);

  const handleChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    const value = element.value;
    setFormData((prev) => ({ ...prev, [element.id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let dataToSend;

    if (isPasswordFieldsShown) {
      dataToSend = formData;
    } else {
      dataToSend = {
        name: formData.name,
        email: formData.email,
      };
    }

    const validations = updateAccountSchema.safeParse(dataToSend);

    if (!validations.success) {
      return toast.error(validations.error.errors[0].message);
    }

    setIsLoading(true);
    const res = await editAccount(formData);
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);

    setCookie("token", res.token, 30);

    setIsModalOpen(false);

    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <FaGear /> Edit Account
      </button>

      {document &&
        createPortal(
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden={!isModalOpen}
            className={`${
              !isModalOpen ? "opacity-0 invisible" : "opacity-100 visible"
            } overflow-y-auto overflow-x-hidden fixed bg-black/30 backdrop-blur-sm flex  z-50 justify-center items-center w-full inset-0  max-h-full`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Account
                  </h3>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden={!isModalOpen}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div onSubmit={handleSubmit} className="p-4 md:p-5">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your name
                      </label>
                      <input
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="John@example.com"
                      />
                    </div>

                    <button
                      onClick={() => setIsPasswordFieldsShown((prev) => !prev)}
                      type="button"
                      className="py-2 flex items-center gap-2 justify-center px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-sky-200 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-sky-900 focus:z-10 dark:bg-sky-700 dark:text-slate-50 dark:border-sky-500 dark:hover:text-white dark:hover:bg-sky-800 dark:focus:ring-sky-600"
                    >
                      {isPasswordFieldsShown ? (
                        <>
                          <TbHandStop />
                          Keep password
                        </>
                      ) : (
                        <>
                          <GoPasskeyFill />
                          Change password
                        </>
                      )}
                    </button>

                    {isPasswordFieldsShown && (
                      <>
                        <div>
                          <label
                            htmlFor="oldPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Old password
                          </label>
                          <input
                            value={formData.oldPassword}
                            onChange={handleChange}
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            New password
                          </label>
                          <input
                            value={formData.newPassword}
                            onChange={handleChange}
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Confirm password
                          </label>
                          <input
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        type="button"
                        className="py-2  px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={handleSubmit}
                        type="submit"
                        className=" text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {isLoading && <VscLoading className="animate-spin" />}{" "}
                        Accept
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document?.body
        )}
    </>
  );
};

export default EditAccountBtn;
