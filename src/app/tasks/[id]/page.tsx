import BackToTasksBtn from "@/components/shared/BackToTasksBtn";
import DeleteBtn from "@/components/shared/DeleteBtn";
import FixTextDir from "@/components/shared/FixTextDir";
import EditTaskBtn from "@/components/task/EditTaskBtn";
import TaskStatus from "@/components/task/TaskStatus";
import dateFormat from "@/utils/dateFormat";
import prisma from "@/utils/db";
import verifyTokenForPage from "@/utils/verifyTokenForPage";
import { Task } from "@prisma/client";
import { cookies } from "next/headers";

import { notFound } from "next/navigation";

type TProps = {
  params: {
    id: string;
  };
};

const SingleTaskPage = async ({ params: { id } }: TProps) => {
  const token = cookies().get("token")?.value;
  const user = verifyTokenForPage(token ?? "");

  if (!user) notFound();

  if (!+id) notFound();

  const task: Task | null = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
      userId: user.id,
    },
  });

  if (!task) notFound();

  const createdAt = dateFormat(new Date(task.createdAt));
  const updatedAt = dateFormat(new Date(task.updatedAt));

  return (
    <section className="py-8 ">
      <div className="py-5 flex items-center flex-wrap gap-y-6 gap-x-8">
        <BackToTasksBtn />

        <div className="flex ms-auto gap-2 justify-end flex-wrap items-center">
          <EditTaskBtn task={task} />

          <DeleteBtn
            itemId={task.id}
            type="task"
            className="flex items-center gap-2 px-3 py-1 justify-center rounded bg-red-700 hover:bg-red-800 focus:ring-red-500"
          >
            Delete
          </DeleteBtn>
        </div>
      </div>

      <div className="flex mt-8  rounded-md shadow-md gap-3 border flex-wrap-reverse px-3 py-6 md:px-6 bg-gray-900/80 border-gray-700">
        <div className="flex grow-[5] flex-col gap-2">
          <h2 dir="auto" className="font-semibold  text-2xl mb-2">
            {task.title}
          </h2>

          <small className="text-orange-500 ">Created at : {createdAt}</small>

          {createdAt !== updatedAt && (
            <small className="text-orange-300 mb-2">
              Updated at : {updatedAt}
            </small>
          )}

          <h3 className="md:px-5 px-2 py-3 rounded border border-slate-500 bg-slate-800">
            <FixTextDir text={task.description} />
          </h3>
        </div>

        <div className="flex flex-col gap-2 grow items-end ">
          <span>
            <TaskStatus status={task.status} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default SingleTaskPage;
