import { Status } from "@prisma/client";
import { BiCheckSquare, BiTimer } from "react-icons/bi";
import { RiTodoFill } from "react-icons/ri";

type TProps = {
  status: Status;
  inForm?: boolean;
  isActive?: boolean;
};
const TaskStatus = ({ status, inForm, isActive }: TProps) => {
  const bg =
    status === "TODO"
      ? "bg-blue-900"
      : status === "PENDING"
      ? "bg-yellow-800"
      : "bg-green-900";

  const isActiveClass =
    inForm && isActive
      ? "opacity-100 brightness-150 "
      : inForm && !isActive
      ? "opacity-50 hover:opacity-100"
      : "";

  const icon = {
    TODO: <RiTodoFill />,
    PENDING: <BiTimer />,
    COMPLETED: <BiCheckSquare />,
  };

  return (
    <span
      className={`text-sm lowercase text-white font-medium transition-all inline-flex items-center ${
        inForm && "cursor-pointer hover:translate-y-0.5 hover:scale-95"
      } px-2.5 py-1 rounded-lg ${isActiveClass} ${bg}`}
    >
      <span className="me-1">{icon[status]}</span>
      <span className="uppercase">{status.slice(0, 1)}</span>
      {status.slice(1)}
    </span>
  );
};

export default TaskStatus;
