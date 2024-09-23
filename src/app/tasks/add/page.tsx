import AddTaskForm from "@/app/components/forms/AddTaskForm";
import BackToTasksBtn from "@/app/components/shared/BackToTasksBtn";
import verifyTokenForPage from "@/utils/verifyTokenForPage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Metadata } from "next";

const AddTaskPage = async () => {
  const token = cookies().get("token")?.value;
  const user = verifyTokenForPage(token ?? "");

  if (!user) return redirect("/");

  return (
    <section className="py-12 flex flex-col grow">
      <div className="">
        <BackToTasksBtn />
      </div>

      <div className="flex items-center grow mt-6 ">
        <div className="mx-auto grow max-w-2xl bg-gray-800 rounded border border-slate-300 px-3 py-6 md:px-6">
          <h1 className="text-2xl mb-6">Add Your Task</h1>
          <AddTaskForm userId={user.id} />
        </div>
      </div>
    </section>
  );
};

export default AddTaskPage;

export const metadata: Metadata = {
  title: "Add Task",
  description: "Add Task",
};
