"use client";

import { AuthContext } from "@/shared/providers/auth";
import { fetchData } from "@/utils/fetch/data";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";

export interface CardTypes {
  id: number;
  name: string;
  description: string;
  visibility: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useContext(AuthContext)!;
  const [courses, setCourses] = useState([]);

  async function getCourses(): Promise<void> {
    const res = await fetchData("courses", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    if (res.status === 200) {
      setCourses(res.data);
    } else {
      console.error(res.data.errors);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (!token || !user) {
      sessionStorage.clear();
      router.push("/login");
    }
  });

  return (
    <main className="bg-gradient-to-l p-5 from-[#0b132b] to-[#1c2541] text-[#f1f1f1] min-h-screen md:ml-[200px] ">
      <h1 className="text-3xl font-bold text-[#e2e2e2]">Courses</h1>
      {courses ? (
        <ul className="flex flex-wrap gap-2.5 mt-4 ">
          {courses.map((course: CardTypes) => {
            const slug = course.name.toLowerCase().replace(" ", "-");
            return (
              <DashboardCard
                key={course.id}
                name={course.name}
                description={course.description}
                url={`/dashboard/${slug}`}
              />
            );
          })}
        </ul>
      ) : (
        "No courses found"
      )}
    </main>
  );
}
