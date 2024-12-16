"use client";

import { AuthContext } from "@/shared/providers/auth";
import { fetchData } from "@/utils/fetch/data";
import { use, useContext, useEffect, useState } from "react";

import Task from "./components/Task/Task";
import CreateTaskBtn from "./components/CreateTaskBtn/CreateTaskBtn";

interface Cls {
  name: string;
  id: number;
  description: string;
}

interface Teacher {
  id: number;
  fullname: string;
}

export default function ClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const [cls, setClass] = useState<Cls>();
  const [teacher, setTeacher] = useState<Teacher>();
  const [errors, setErrors] = useState(false);
  const { token, user } = useContext(AuthContext)!;

  const [tasks, setTasks] = useState([]);

  const unwrappedParams = use(params);
  const id = unwrappedParams.class_id;

  async function getClassData() {
    const res = await fetchData(`classes/${id}`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    if (res.status === 200) {
      setClass(res.data.classData);
    } else {
      setErrors(true);
    }
    return res;
  }

  async function getTeacherData() {
    const res = await fetchData(`classes/${id}/teacher`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });

    if (res.status === 200) {
      setTeacher(res.data.teacher);
    }
  }

  async function getTasks() {
    const res = await fetchData(`classes/${id}/tasks`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });

    if (res.status === 200) {
      setTasks(res.data.tasks);
    }
  }

  useEffect(() => {
    getClassData();
    getTeacherData();
    getTasks();
  }, []);

  return (
    <main className="ml-[200px] p-5 bg-[#666] text-[#f1f1f1] min-h-screen">
      {errors ? (
        <h1>Class not found</h1>
      ) : (
        cls && (
          <>
            <h1 className="font-bold text-2xl">{cls.name}</h1>
            <p>{cls.description}</p>
            <p>{teacher?.fullname}</p>
            {user && user.user && user.user.id === teacher?.id && (
              <CreateTaskBtn currentClassID={id} />
            )}
            <h2>Tasks</h2>
            {tasks ? (
              <ul className="flex flex-wrap gap-2">
                {tasks.map(
                  (task: {
                    id: number;
                    name: string;
                    description: string;
                    due_date: string;
                  }) => {
                    return (
                      <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        description={task.description}
                        due_date={task.due_date}
                      />
                    );
                  }
                )}
              </ul>
            ) : (
              <p>No tasks found</p>
            )}
          </>
        )
      )}
    </main>
  );
}
