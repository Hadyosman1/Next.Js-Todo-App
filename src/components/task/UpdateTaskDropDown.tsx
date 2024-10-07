import React, { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import EditTaskStatus from "../forms/EditTaskStatus";
import { Status } from "@prisma/client";
import { updateTaskStatus } from "@/services/serverActions/taskActions";
import toast from "react-hot-toast";

import { BsThreeDotsVertical } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc";

type Props = {
  oldStatus: Status;
  isOpen: boolean;
  setOpenedDropdown: (id: number | null) => void;
  id: number;
  position: "top" | "down";
};

const UpdateTaskDropDown = ({
  oldStatus,
  isOpen,
  id,
  setOpenedDropdown,
  position,
}: Props) => {
  const [status, setStatus] = useState(oldStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setStatusCallback = useCallback((status: Status) => {
    setStatus(status);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await updateTaskStatus(id, status);
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    setOpenedDropdown(null);
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (isOpen) {
            setStatus(oldStatus);
            setOpenedDropdown(null);
          } else {
            setOpenedDropdown(id);
          }
        }}
        className="
        text-white p-1 text-lg 
        rounded transition-all bg-slate-700
        hover:bg-slate-800 hover:ring hover:ring-white
        "
      >
        {isOpen ? <CgClose /> : <BsThreeDotsVertical />}
      </button>

      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className={`absolute z-10 flex-col 
          gap-1 px-2 py-3 rounded border
           bg-slate-700 right-0
        ${
          position === "down"
            ? " translate-y-[calc(100%_+_5px)]  bottom-0 "
            : " -translate-y-[calc(100%_+_5px)]  top-0 "
        }
        ${isOpen ? "flex" : "hidden"}`}
      >
        <EditTaskStatus status={status} setStatus={setStatusCallback} />
        <button
          disabled={oldStatus === status || isLoading}
          className="py-1 flex items-center justify-center gap-1 px-3 mt-2 rounded text-center bg-sky-600"
          type="submit"
        >
          {isLoading && <VscLoading className="animate-spin" />}Confirm
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskDropDown;
