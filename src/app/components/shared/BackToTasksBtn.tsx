import Link from "next/link";
import { FaCircleArrowLeft } from "react-icons/fa6";

const BackToTasksBtn = () => {
  return (
    <Link
      className="hover:underline shrink-0 bg-sky-600 hover:bg-sky-700 gap-2 rounded inline-flex items-center justify-center px-3 py-1 "
      href="/tasks"
    >
      <FaCircleArrowLeft /> Back To Tasks
    </Link>
  );
};

export default BackToTasksBtn;
