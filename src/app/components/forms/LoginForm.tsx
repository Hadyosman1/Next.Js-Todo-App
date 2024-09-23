"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { VscLoading } from "react-icons/vsc";
import { loginSchema } from "@/schemas/schemas";
import toast from "react-hot-toast";
import { login, TLoginProps } from "@/services/serverActions/userActions";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmitted = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as TLoginProps;

    const validations = loginSchema.safeParse(data);
    if (!validations.success) {
      return toast.error(validations.error.errors[0].message);
    }

    setIsLoading(true);
    const res = await login(data);
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    setCookie("token", res.token, 30);
    router.replace("/tasks");
    router.refresh();
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmitted}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full flex items-center justify-center gap-1 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
      >
        {isLoading && <VscLoading className="animate-spin" />} Log In
      </button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        i don't have an account...!
        <Link
          href="/"
          className="font-medium text-sky-600 hover:underline dark:text-sky-500"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
