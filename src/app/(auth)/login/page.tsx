import { Metadata } from "next";

import LoginForm from "@/components/forms/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const LoginPage = () => {
  const token = cookies().get("token")?.value;

  if (token) redirect("/tasks");

  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center justify-center md:px-6 py-8 mx-auto h-screen lg:py-0">
        <h1 className=" text-xl md:text-2xl font-bold mb-6 uppercase">
          Welcome in <span className="text-sky-500">TODO APP</span>
        </h1>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login To Account
            </h2>

            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
