"use client";

import { useState } from "react";
import { addTaskSchema } from "@/schemas/schemas";
import { createTask } from "@/services/serverActions/taskActions";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { VscLoading } from "react-icons/vsc";

const AddTaskForm = ({ userId }: { userId: number }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("userId", `${userId}`);

    const validation = addTaskSchema.safeParse({
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      userId: parseInt(formData.get("userId") as string),
    });

    if (!validation.success) {
      return toast.error(validation.error.errors[0].message);
    }

    setLoading(true);
    const res = await createTask(formData);
    setLoading(false);

    if (!res.ok) {
      return toast.error(res.error);
    }

    toast.success(res.message);
    router.push("/");
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={submitAction}>
      <input
        dir="auto"
        autoFocus
        type="text"
        name="title"
        placeholder="Task Title"
      />

      <textarea
        dir="auto"
        name="description"
        placeholder="Task Description"
        rows={5}
        className="max-h-44"
      />

      <button
        disabled={isLoading}
        className="bg-sky-600 hover:bg-sky-700 py-1.5 rounded justify-center flex items-center gap-2"
        type="submit"
      >
        {isLoading && <VscLoading className="animate-spin" />} Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
