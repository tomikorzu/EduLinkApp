"use client";

import { useState } from "react";
import CreateTaskModal from "../CreateTaskModel/CreateTaskModel";

export default function CreateTaskBtn({
  currentClassID,
}: {
  currentClassID: number;
}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <button
        className="bg-[#2ee01d] text-[#f1f1f1] p-2 rounded-md"
        onClick={() => setModal(true)}
      >
        Create a task
      </button>
      {modal && (
        <CreateTaskModal setModal={setModal} currentClassId={currentClassID} />
      )}
    </>
  );
}
