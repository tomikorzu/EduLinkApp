import { useContext, useState } from "react";
import { fetchData } from "@/utils/fetch/data";
import { AuthContext } from "@/shared/providers/auth";

export default function JoinCourseModal() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const { token } = useContext(AuthContext)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      "courses/join",
      "POST",
      { courseName, courseCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (res.status === 200) {
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
      />
      <input
        type="text"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <button type="submit" className="bg-[#2ee01d] text-[#f1f1f1]">
        Join Course
      </button>
    </form>
  );
}
