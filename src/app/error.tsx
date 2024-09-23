"use client";

import BackToTasksBtn from "./components/shared/BackToTasksBtn";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <section className="bg-white min-h-svh grid items-center dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-sky-600 dark:text-sky-500">
            400
          </h1>

          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl break-all dark:text-white">
            {error.message || "Internal Server Error."}
          </p>

          <div className="flex gap-3 items-center justify-center">
            <BackToTasksBtn />

            <button
              onClick={() => reset()}
              className="rounded px-3 py-1 hover:bg-slate-700 bg-slate-600 border border-slate-200"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
