import { useContext, useState } from "react";
import { AuthContext } from "@/shared/providers/auth";
import { fetchData } from "@/utils/fetch/data";

export default function CreateCourseModal() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const { token } = useContext(AuthContext)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      "courses",
      "POST",
      { courseName, courseCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (res.status === 201) {
      console.log(res.data);
    } else {
      console.error(res.data.errors);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="bg-[#2ee01d] text-[#f1f1f1]">
        Create Course
      </button>
    </form>
  );
}
