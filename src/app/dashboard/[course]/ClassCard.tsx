import Link from "next/link";

export default function ClassCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const slug = name.toLowerCase().replace(" ", "-");

  return (
    <Link href={`/dashboard/6ao/${slug}`}>
      <article className="bg-[#333] w-[300px] p-5 rounded-md relative flex flex-col cursor-pointer hover:scale-95 transition duration-500 hover:brightness-125">
        <h2>{name}</h2>
        <p>{description}</p>
      </article>
    </Link>
  );
}
