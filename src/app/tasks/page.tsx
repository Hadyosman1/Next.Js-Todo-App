import prisma from "@/utils/db";
import { Task } from "@prisma/client";
import Link from "next/link";
import { cookies } from "next/headers";
import verifyTokenForPage from "@/utils/verifyTokenForPage";
import { redirect } from "next/navigation";
import TasksTable from "../../components/task/TasksTable";

import { LuPlusCircle } from "react-icons/lu";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const token = cookies().get("token")?.value;
  const user = verifyTokenForPage(token ?? "");

  if (!user) return redirect("/");

  const tasks: Task[] = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-8 flex flex-col gap-4">
      <h1 className="text-3xl text-center font-bold uppercase">Todo App</h1>

      <Link
        className="bg-sky-600 hover:bg-sky-700 rounded self-start px-3 py-1 flex items-center justify-center gap-1 hover:underline"
        href={"/tasks/add"}
      >
        <LuPlusCircle />
        Add task
      </Link>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold py-4">Tasks List</h2>

        <TasksTable tasks={tasks} />
      </div>
    </section>
  );
};

export default HomePage;
