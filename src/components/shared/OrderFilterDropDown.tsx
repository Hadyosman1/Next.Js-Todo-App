import React, { SetStateAction, useState } from "react";

import { MdOutlineKeyboardArrowDown as DropDownArrow } from "react-icons/md";
import { IFilter } from "../task/TasksTable";

interface IProps {
  filter: IFilter;
  setFilter: React.Dispatch<SetStateAction<IFilter>>;
}

const OrderFilterDropDown = ({ filter, setFilter }: IProps) => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setIsSortMenuOpen((prev) => !prev)}
        type="button"
        id="dropdownDefaultButton"
        data-dropdown-toggle="sortingDropDown"
        className="text-white capitalize min-w-24 gap-1  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 justify-center py-2.5 text-center flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Order by
        <DropDownArrow
          className={`${
            isSortMenuOpen && "rotate-180"
          } transition-all duration-300 mt-0.5 text-lg`}
        />
      </button>

      <div
        id="sortingDropDown"
        className={`${
          !isSortMenuOpen ? "opacity-0 invisible" : "opacity-100 visible"
        } absolute transition-all z-10 -bottom-1.5 right-0 translate-y-full border bg-white rounded-lg shadow w-full dark:bg-gray-700`}
      >
        <ul
          className="p-2 flex flex-col gap-1  text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, date: "newest" }));
                setIsSortMenuOpen(false);
              }}
              className={`${
                filter.date === "newest"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2  `}
            >
              Newest
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setFilter((prev) => ({ ...prev, date: "oldest" }));
                setIsSortMenuOpen(false);
              }}
              className={`${
                filter.date === "oldest"
                  ? " bg-blue-600"
                  : "dark:hover:bg-gray-600 dark:hover:text-white"
              } w-full px-2 py-2  `}
            >
              Oldest
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderFilterDropDown;
