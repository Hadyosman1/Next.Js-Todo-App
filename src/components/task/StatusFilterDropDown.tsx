import React, { SetStateAction, useState } from "react";
import { IFilter } from "./TasksTable";

//icons
import { MdOutlineKeyboardArrowDown as DropDownArrow } from "react-icons/md";
import { BiCheckSquare, BiTimer } from "react-icons/bi";
import { RiTodoFill } from "react-icons/ri";

interface IProps {
  filter: IFilter;
  setFilter: React.Dispatch<SetStateAction<IFilter>>;
}

const StatusFilterDropDown = ({ filter, setFilter }: IProps) => {
  const [isStatusFilterMenuOpen, setIsStatusFilterMenuOpen] = useState(false);

  const icons = {
    TODO: <RiTodoFill className="mt-0.5" />,
    PENDING: <BiTimer className="mt-0.5" />,
    COMPLETED: <BiCheckSquare className="mt-0.5" />,
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setIsStatusFilterMenuOpen((prev) => !prev)}
        type="button"
        id="dropdownDefaultButton"
        data-dropdown-toggle="sortingDropDown"
        className="text-white capitalize min-w-24 gap-1  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 justify-center py-2.5 text-center flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Status
        <DropDownArrow
          className={`${
            isStatusFilterMenuOpen && "rotate-180"
          } transition-all duration-300 mt-0.5 text-lg`}
        />
      </button>

      <div
        id="sortingDropDown"
        className={`${
          !isStatusFilterMenuOpen
            ? "opacity-0 invisible"
            : "opacity-100 visible"
        } absolute transition-all z-10 -bottom-1.5 right-0 translate-y-full border bg-white rounded-lg shadow max-w-fit min-w-full dark:bg-gray-700`}
      >
        <ul
          className="p-2 flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, status: "all" }));
                setIsStatusFilterMenuOpen(false);
              }}
              className={`${
                filter.status === "all"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2  `}
            >
              All
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, status: "TODO" }));
                setIsStatusFilterMenuOpen(false);
              }}
              className={`${
                filter.status === "TODO"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2 flex items-center gap-1.5  `}
            >
              {icons.TODO} Todo
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, status: "PENDING" }));
                setIsStatusFilterMenuOpen(false);
              }}
              className={`${
                filter.status === "PENDING"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2 flex items-center gap-1.5   `}
            >
              {icons.PENDING} Pending
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, status: "COMPLETED" }));
                setIsStatusFilterMenuOpen(false);
              }}
              className={`${
                filter.status === "COMPLETED"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2 flex items-center gap-1.5   `}
            >
              {icons.COMPLETED} completed
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StatusFilterDropDown;
