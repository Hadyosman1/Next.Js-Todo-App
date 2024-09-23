"use server";

import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { TUpdateAccount } from "@/schemas/schemas";

export type TRegisterProps = {
  name: string;
  email: string;
  password: string;
};

type TAuthReturn =
  | { ok: true; message: string; token: string }
  | { ok: false; error: string };

export async function register(data: TRegisterProps): Promise<TAuthReturn> {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (user) {
      return {
        ok: false,
        error: "User already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;

    const createdUser = await prisma.user.create({
      data,
    });

    if (!createdUser) {
      return {
        ok: false,
        error: "Something went wrong , please try again...",
      };
    }

    const token = jwt.sign(createdUser, process.env.SECRET_KEY as string, {
      expiresIn: "30d",
    });

    return {
      ok: true,
      message: "Account created successfully",
      token,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Some thing went wrong , please try again...",
    };
  }
}

export type TLoginProps = {
  email: string;
  password: string;
};

export async function login(data: TLoginProps): Promise<TAuthReturn> {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      return {
        ok: false,
        error: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return {
        ok: false,
        error: "Wrong email or password",
      };
    }

    const token = jwt.sign(user, process.env.SECRET_KEY as string, {
      expiresIn: "30d",
    });

    return {
      ok: true,
      message: "Login successful",
      token,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Some thing went wrong , please try again...",
    };
  }
}

export async function editAccount(
  data: TUpdateAccount,
  id: number,
  token: string | undefined
): Promise<TAuthReturn> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return {
        ok: false,
        error: "User not found",
      };
    }

    const userFromToken = jwt.verify(
      token ?? "",
      process.env.SECRET_KEY as string
    ) as User | null;

    if (userFromToken?.id !== id) {
      return {
        ok: false,
        error: "You are not authorized to edit this account",
      };
    }

    if (data.oldPassword && data.newPassword) {
      const verifyPassword = await bcrypt.compare(
        data.oldPassword,
        user.password
      );

      if (!verifyPassword) {
        return {
          ok: false,
          error: "Wrong old password",
        };
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(data.newPassword, salt);
      data.newPassword = newPassword;
    }

    if (data.email !== user.email) {
      const userExists = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (userExists) {
        return {
          ok: false,
          error: "User with this email already exists",
        };
      }
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.newPassword || user.password,
      },
    });

    const newToken = jwt.sign(updatedUser, process.env.SECRET_KEY as string, {
      expiresIn: "30d",
    });

    return {
      ok: true,
      message: "Account updated successfully",
      token: newToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Some thing went wrong , please try again...",
    };
  }
}

type TDeleteAccountReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };
export async function deleteAccount(
  token: string,
  id: number
): Promise<TDeleteAccountReturn> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return {
        ok: false,
        error: "User not found",
      };
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as User;
    if (decoded.id !== id) {
      return {
        ok: false,
        error: "You are not authorized to delete this account",
      };
    }

    await prisma.user.delete({ where: { id } });

    return {
      ok: true,
      message: "Account deleted successfully",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Some thing went wrong , please try again...",
    };
  }
}
