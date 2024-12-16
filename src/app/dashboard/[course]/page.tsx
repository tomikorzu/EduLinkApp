"use client";

import { fetchData } from "@/utils/fetch/data";
import { useContext, useEffect, useState, use } from "react";
import { AuthContext } from "@/shared/providers/auth";
import DashboardCard from "../DashboardCard";
import { CardTypes } from "../page";

interface Course {
  id: string;
  name: string;
  code: string;
  classes: CardTypes[];
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { token } = useContext(AuthContext)!;
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState(false);
  const [course, setCourse] = useState<Course>();

  const unwrappedParams = use(params);

  useEffect(() => {
    fetchCourseData();
  }, []);

  async function fetchCourseData() {
    const res = await fetchData(
      `courses/${unwrappedParams.course}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (res.status === 200) {
      setClasses(res.data.classes);
      setCourse(res.data.data);
    } else if (res.status === 404) {
      setErrors(true);
    } else {
      console.error(res.data.errors);
    }

    return res;
  }
  return (
    <main className="ml-[200px] p-5 text-[#f1f1f1] bg-[#777] min-h-screen">
      <h1 className="font-bold text-2xl capitalize">{course && course.name}</h1>
      {!errors ? (
        <ul className="flex flex-wrap gap-2.5 mt-4">
          {classes.map((cls: CardTypes) => {
            return (
              <DashboardCard
                key={cls.id}
                name={cls.name}
                description={cls.description}
                url={course  ? `/dashboard/${course.id}/${cls.id}`: "/dashboard"}
              />
            );
          })}
        </ul>
      ) : (
        "No classes found"
      )}
    </main>
  );
}
