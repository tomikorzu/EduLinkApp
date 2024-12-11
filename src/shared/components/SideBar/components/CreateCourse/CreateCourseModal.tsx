import { useContext, useState } from "react";
import { AuthContext } from "@/shared/providers/auth";
import { fetchData } from "@/utils/fetch/data";

export default function CreateCourseModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseVisibility, setCourseVisibility] = useState("public");

  const { token } = useContext(AuthContext)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      "courses/create",
      "POST",
      { courseName, courseCode, courseDescription, courseVisibility },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (res.status === 201) {
      console.log(res.data);
      setShowModal(false);
    } else {
      console.error(res.data.errors);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col fixed top-[50%] left-[50%] translate-[-50%, -50%] bg-[#333] z-10 text-[#111]"
    >
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
      />
      <input
        type="text"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        placeholder="Course Code"
      />
      <textarea
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        placeholder="Course Description"
      />
      <select
        value={courseVisibility}
        onChange={(e) => setCourseVisibility(e.target.value)}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit" className="bg-[#2ee01d] text-[#f1f1f1]">
        Create Course
      </button>
    </form>
  );
}
