"use server";
import prisma from "@/utils/db";
import { Status, Task } from "@prisma/client";

type TActionReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function createTask(formData: FormData): Promise<TActionReturn> {
  try {
    const data = {
      title: formData.get("title")?.toString() as string,
      description: formData.get("description")?.toString() as string,
      userId: parseInt(formData.get("userId") as string) as number,
    };

    await prisma.task.create({
      data,
    });

    return {
      ok: true,
      message: "Task added successfully...",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create task. Please try again later.",
    };
  }
}

export async function DeleteTask(id: number): Promise<TActionReturn> {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      message: "Task deleted successfully...",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete task. Please try again later.",
    };
  }
}

export async function updateTask(task: Task): Promise<TActionReturn> {
  try {
    await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
      },
    });

    return {
      ok: true,
      message: "Task updated successfully...",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update task. Please try again later.",
    };
  }
}

export async function updateTaskStatus(
  id: number,
  status: Status
): Promise<TActionReturn> {
  try {
    await prisma.task.update({
      where: { id },
      data: { status },
    });

    return {
      ok: true,
      message: "Task updated successfully...",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update task status. Please try again later.",
    };
  }
}
