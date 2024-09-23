import { Task } from "@prisma/client";
import Link from "next/link";
import TaskStatus from "./TaskStatus";
import { BiDetail } from "react-icons/bi";

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm  text-white text-center">
        <thead className="text-xs uppercase  bg-gray-700 text-gray-200">
          <tr className="">
            <th scope="col" className="px-6 py-3">
              #
            </th>

            <th scope="col" className="px-6 py-3">
              Title
            </th>

            <th scope="col" className="px-6 py-3">
              Created At
            </th>

            <th scope="col" className="px-6 py-3 ">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              Details
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task.id}
              className="transition-colors border-b bg-gray-800 border-gray-700 hover:bg-gray-900"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
              >
                {index + 1}
              </th>

              <td dir="auto" className="px-6 py-4 text-start">
                {task.title}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <p>{new Date(task.createdAt).toUTCString()}</p>
              </td>

              <td className="px-6 py-4">
                <TaskStatus status={task.status} />
              </td>

              <td className="px-6 py-4">
                <Link
                  className="rounded bg-sky-600 inline-flex items-center gap-1 hover:bg-sky-700 px-3 py-1 hover:underline"
                  href={`/tasks/${task.id}`}
                >
                  <BiDetail /> Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

        {!tasks.length && (
          <tfoot>
            <tr className="border-b bg-gray-800 border-gray-700 text-center">
              <td className="px-6 py-4 text-lg" colSpan={10}>
                There is no tasks yet, go to add tasks now...
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TasksTable;
