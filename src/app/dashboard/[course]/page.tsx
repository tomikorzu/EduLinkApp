"use client";

import { fetchData } from "@/utils/fetch/data";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/shared/providers/auth";
import DashboardCard from "../DashboardCard";
import { CardTypes } from "../page";

export default function CoursePage() {
  const { token } = useContext(AuthContext)!;
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, []);

  async function fetchCourseData() {
    const res = await fetchData(`courses/1`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    console.log(res.data.classes);

    if (res.status === 200) {
      setClasses(res.data.classes);
    } else if (res.status === 404) {
      setErrors(true);
    } else {
      console.error(res.data.errors);
    }

    return res;
  }
  return (
    <main className="ml-[200px] p-5 text-[#f1f1f1] bg-[#777] min-h-screen">
      <h1 className="font-bold text-2xl capitalize">{"a"}</h1>
      {!errors ? (
        <ul className="flex flex-wrap gap-2.5 mt-4">
          {classes.map((cls: CardTypes) => {
            const slug = cls.name.toLowerCase().replace(" ", "-");
            return (
              <DashboardCard
                key={cls.id}
                name={cls.name}
                description={cls.description}
                url={`/dashboard/6ao/${slug}`}
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
