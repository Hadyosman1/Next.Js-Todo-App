"use client";

import React, { FormEvent, useLayoutEffect, useState } from "react";
import TaskStatus from "./TaskStatus";
import { Task } from "@prisma/client";
import { updateTask } from "@/services/serverActions/taskActions";
import toast from "react-hot-toast";
import { editTaskSchema } from "@/schemas/schemas";

import { VscLoading } from "react-icons/vsc";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const EditTaskBtn = ({ task }: { task: Task }) => {
  const [formState, setFormState] = useState(task);

  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useLayoutEffect(() => {
    return () => {
      if (!isModalOpen) {
        setFormState(task);
      }
    };
  }, [task, isModalOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validations = editTaskSchema.safeParse(formState);

    if (!validations.success) {
      return toast.error(validations.error.errors[0].message, {
        position: "bottom-center",
      });
    }

    setIsLoading(true);
    const res = await updateTask(formState);
    setIsLoading(false);

    if (!res.ok) {
      return toast.error(res.error, {
        position: "bottom-center",
      });
    }

    toast.success(res.message);
    setIsModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="flex items-center gap-2 rounded justify-center bg-blue-700 hover:bg-blue-800 px-3 py-1 hover:underline"
      >
        Edit
        <FaPencil />
      </button>

      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden={!isModalOpen}
        className={` ${
          !isModalOpen ? "translate-y-full opacity-0" : " opacity-100"
        } transition duration-300 overflow-y-auto overflow-x-hidden backdrop-blur-sm bg-black/20 fixed z-50 flex justify-center items-center w-full inset-0 h-svh max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 className="text-lg font-semibold text-white">Edit task</h3>

              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
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

            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    value={formState.title}
                    dir="auto"
                    type="text"
                    name="title"
                    id="title"
                    className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="title"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    value={formState.description}
                    dir="auto"
                    id="description"
                    rows={4}
                    className="block min-h-20 max-h-40 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  />
                </div>

                <div className="col-span-full flex gap-2 ">
                  <label className="relative">
                    <input
                      onChange={() =>
                        setFormState((prev) => ({ ...prev, status: "TODO" }))
                      }
                      checked={formState.status === "TODO"}
                      type="radio"
                      name="status"
                      className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
                    />
                    <TaskStatus
                      status="TODO"
                      isActive={formState.status === "TODO"}
                      inForm={true}
                    />
                  </label>

                  <label className="relative">
                    <input
                      onChange={() =>
                        setFormState((prev) => ({ ...prev, status: "PENDING" }))
                      }
                      checked={formState.status === "PENDING"}
                      type="radio"
                      name="status"
                      className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
                    />

                    <TaskStatus
                      status="PENDING"
                      isActive={formState.status === "PENDING"}
                      inForm={true}
                    />
                  </label>

                  <label className="relative">
                    <input
                      onChange={() =>
                        setFormState((prev) => ({
                          ...prev,
                          status: "COMPLETED",
                        }))
                      }
                      checked={formState.status === "COMPLETED"}
                      type="radio"
                      name="status"
                      className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
                    />

                    <TaskStatus
                      status="COMPLETED"
                      isActive={formState.status === "COMPLETED"}
                      inForm={true}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="text-white inline-flex items-center bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  justify-center rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Cancel
                </button>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="text-white inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium justify-center rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {isLoading && <VscLoading className="animate-spin" />} Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskBtn;
