import CreateCourseModal from "./CreateCourseModal";

export default function CreateCourseBtn() {
  function createTask() {
    <CreateCourseModal />;
  }
  return (
    <button
      onClick={createTask}
      type="button"
      className="flex items-center gap-1 p-2 bg-[#10da32] rounded-md mx-auto my-4 hover:brightness-110 transition duration-500"
    >
      <i className="fa-solid fa-plus"></i> <span>Create Class</span>
    </button>
  );
}
