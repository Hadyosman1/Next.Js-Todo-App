import TaskStatus from "../task/TaskStatus";
import { Status } from "@prisma/client";

type Props = {
  status: Status;
  setStatus: (status: Status) => void;
};

const EditTaskStatus = ({ status, setStatus }: Props) => {
  return (
    <>
      <label className="relative">
        <input
          onChange={() => setStatus("TODO")}
          checked={status === "TODO"}
          type="radio"
          name="status"
          className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
        />
        <TaskStatus status="TODO" isActive={status === "TODO"} inForm={true} />
      </label>

      <label className="relative">
        <input
          onChange={() => setStatus("PENDING")}
          checked={status === "PENDING"}
          type="radio"
          name="status"
          className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
        />

        <TaskStatus
          status="PENDING"
          isActive={status === "PENDING"}
          inForm={true}
        />
      </label>

      <label className="relative">
        <input
          onChange={() => setStatus("COMPLETED")}
          checked={status === "COMPLETED"}
          type="radio"
          name="status"
          className="appearance-none dark:focus:ring-blue-500 focus:ring-0 absolute w-full h-full"
        />

        <TaskStatus
          status="COMPLETED"
          isActive={status === "COMPLETED"}
          inForm={true}
        />
      </label>
    </>
  );
};

export default EditTaskStatus;
