"use client";

import { AuthContext } from "@/shared/providers/auth";
import { fetchData } from "@/utils/fetch/data";
import { useContext, useState } from "react";

export default function CreateTaskModal({
  setModal,
  currentClassId,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentClassId: string;
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const { token, user } = useContext(AuthContext)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      `classes/${currentClassId}/tasks/create`,
      "POST",
      {
        title: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        teacher_id: user && user.user && user.user.id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (res.status === 201) {
      console.log(res.data);
      setModal(false);
    } else {
      console.error(res.data.errors);
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[5px] bg-[#00000050]">
      <form
        onSubmit={handleSubmit}
        className="p-2 rounded-md bg-[#222] flex flex-col gap-2  relative"
      >
        <button
          type="button"
          className="text-[#f1f1f1] absolute right-1 top-1"
          onClick={() => setModal(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="text-center text-2xl font-bold  ">Create task</h2>
        <input
          className="bg-[#777] p-2 rounded-md outline-none"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          className="bg-[#777] p-2 rounded-md outline-none"
          type="text"
          placeholder="Enter description"
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <input
          className="bg-[#777] p-2 rounded-md outline-none"
          type="date"
          placeholder="Enter Due Date"
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <button type="submit" className="bg-[#1dca17] p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
