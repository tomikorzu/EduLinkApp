"use client";

import Link from "next/link";

export default function DashboardCard({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <Link href={url}>
      <article className="bg-[#333] w-[300px] p-5 rounded-md relative flex flex-col cursor-pointer hover:scale-95 transition duration-500 hover:brightness-125">
        <h2>{name}</h2>
        <p>{description}</p>
      </article>
    </Link>
  );
}
