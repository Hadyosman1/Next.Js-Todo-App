import BackToTasksBtn from "@/app/components/shared/BackToTasksBtn";
import DeleteBtn from "@/app/components/shared/DeleteBtn";
import EditTaskBtn from "@/app/components/task/EditTaskBtn";
import TaskStatus from "@/app/components/task/TaskStatus";
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

  return (
    <section className="py-8">
      <div className="py-5 flex items-center flex-wrap gap-y-3 gap-x-8">
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

      <div className="flex mt-8 rounded-md shadow-md gap-3 border flex-wrap px-3 py-6 md:px-6 bg-gray-900/80 border-gray-700">
        <div className="flex grow flex-col gap-2">
          <h2 className="font-semibold text-2xl mb-2">{task.title}</h2>

          <small className="text-orange-500">
            {new Date(task.createdAt).toUTCString()}
          </small>

          <h3>{task.description}</h3>
        </div>

        <div className="flex flex-col gap-2 ">
          <TaskStatus status={task.status} />
        </div>
      </div>
    </section>
  );
};

export default SingleTaskPage;
