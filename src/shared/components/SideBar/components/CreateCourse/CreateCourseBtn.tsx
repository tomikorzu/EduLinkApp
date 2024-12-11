import CreateCourseModal from "./CreateCourseModal";

import { useState } from "react";

export default function CreateCourseBtn() {
  const [showModal, setShowModal] = useState(false);
  function createTask() {
    setShowModal(true);
  }
  return (
    <>
      <button
        onClick={createTask}
        type="button"
        className="flex items-center gap-1 p-2 bg-[#10da32] rounded-md mx-auto my-4 hover:brightness-110 transition duration-500"
      >
        <i className="fa-solid fa-plus"></i> <span>Create Course</span>
      </button>
      {showModal && <CreateCourseModal setShowModal={setShowModal} />}
    </>
  );
}
