export default function Task({
  id,
  name,
  description,
  due_date,
}: {
  id: number;
  name: string;
  description: string;
  due_date: string;
}) {
  return (
    <article className="bg-[#333] w-fit p-2 rounded-md">
      <span>{id}</span>
      <h2 className="font-bold text-xl">{name}</h2>
      <p>{description}</p>
      <p>{due_date}</p>
    </article>
  );
}
