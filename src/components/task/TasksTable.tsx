"use client";

import React, { useMemo, useState } from "react";
import dateFormat from "@/utils/dateFormat";
import { Status, Task } from "@prisma/client";
import Link from "next/link";
import TaskStatus from "./TaskStatus";
import FixTextDir from "../shared/FixTextDir";
import StatusFilterDropDown from "./StatusFilterDropDown";
import OrderFilterDropDown from "../shared/OrderFilterDropDown";
import TasksSearchInput from "./TasksSearchInput";

import { BiDetail } from "react-icons/bi";

export interface IFilter {
  status: Status | "all";
  date: "newest" | "oldest";
}

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const [filter, setFilter] = useState<IFilter>({
    status: "all",
    date: "newest",
  });

  const [searchText, setSearchText] = useState("");

  const filteredTasks = useMemo(() => {
    let store = tasks;

    if (filter.date === "newest") {
      store = store.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (filter.date === "oldest") {
      store = store.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    if (filter.status === "TODO") {
      store = store.filter((el) => el.status === "TODO");
    }

    if (filter.status === "PENDING") {
      store = store.filter((el) => el.status === "PENDING");
    }

    if (filter.status === "COMPLETED") {
      store = store.filter((el) => el.status === "COMPLETED");
    }

    if (searchText) {
      store = store.filter((el) =>
        el.title.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    return store;
  }, [filter.date, filter.status, tasks, searchText]);

  return (
    <>
      <div className="py-2 gap-4 flex items-center flex-wrap">
        <TasksSearchInput
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="flex gap-2 flex-1  items-center justify-end">
          <StatusFilterDropDown filter={filter} setFilter={setFilter} />
          <OrderFilterDropDown filter={filter} setFilter={setFilter} />
        </div>
      </div>

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
            {filteredTasks.map((task, idx) => (
              <tr
                key={task.id}
                className="transition-colors border-b bg-gray-800 border-gray-700 hover:bg-gray-900"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {idx + 1}
                </th>

                <td
                  dir="auto"
                  className="px-6 py-4 text-start min-w-64 max-w-72 text-base md:text-lg  font-semibold"
                >
                  <FixTextDir text={task.title} />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <p>{dateFormat(new Date(task.createdAt))}</p>
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

          {(!filteredTasks.length || !tasks.length) && (
            <tfoot>
              <tr className="border-b bg-gray-800 border-gray-700 text-center">
                <td className="px-6 py-4 text-lg" colSpan={10}>
                  {!tasks.length && `There's No Tasks Yet, Go To Add Task...`}
                  {tasks.length &&
                    !filteredTasks.length &&
                    `There's No Tasks Match Your Filtration...`}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default TasksTable;
