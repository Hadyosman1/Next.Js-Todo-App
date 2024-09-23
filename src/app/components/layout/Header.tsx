"use client";

import { deleteCookie } from "@/utils/cookies";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteBtn from "../shared/DeleteBtn";
import EditAccountBtn from "../user/EditAccountBtn";

import { IoHappyOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";

const Header = ({ user, token }: { user: User; token: string | undefined }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleCloseDropDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.id !== "userDropDown")
        setIsDropDownOpen(false);
    };

    document.addEventListener("click", handleCloseDropDown);

    return () => {
      document.removeEventListener("click", handleCloseDropDown);
    };
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    router.refresh();
  };

  return (
    <header className="bg-gray-800 shadow-md shadow-slate-900 border-b border-slate-500 sticky top-0 py-3 sm:px-6">
      <div className="container mx-auto flex flex-wrap items-center gap-3">
        <h2 className="flex gap-1 items-center font-semibold shrink-0">
          Welcome <IoHappyOutline className="text-xl -mb-1" />
        </h2>

        <div className="relative ms-auto flex-grow ">
          <button
            onClick={() => setIsDropDownOpen((prev) => !prev)}
            id="userDropDown"
            data-dropdown-toggle="dropdown"
            className="text-white ms-auto bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2 text-center flex items-center min-w-content max-w-44 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            type="button"
          >
            <span className="whitespace-nowrap pointer-events-none overflow-hidden text-ellipsis max-w-32">
              {user.name}
            </span>
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`${
              !isDropDownOpen ? "invisible opacity-0" : "opacity-100 visible"
            } transition-all z-10 translate-y-2 absolute right-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="userDropDown"
            >
              <li>
                <DeleteBtn
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  type="account"
                  itemId={user.id}
                  token={token}
                >
                  Delete Account
                </DeleteBtn>
              </li>

              <li>
                <EditAccountBtn user={user} />
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <GoSignOut /> Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
