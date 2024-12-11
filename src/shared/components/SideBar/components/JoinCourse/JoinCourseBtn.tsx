import JoinCourseModal from "./JoinCourseModal";

export default function JoinCourseBtn() {
  function joinCourse() {
    <JoinCourseModal />;
  }
  return (
    <button
      onClick={joinCourse}
      type="button"
      className="flex items-center gap-1 p-2 bg-[#10da32] rounded-md mx-auto my-4 hover:brightness-110 transition duration-500"
    >
      <i className="fa-solid fa-plus"></i> <span>Join course</span>
    </button>
  );
}
