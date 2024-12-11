export default function CourseCard({
  name,
  description,
  visibility,
}: {
  name: string;
  description: string;
  visibility: string;
}) {
  return (
    <article className="bg-[#333] w-[300px] p-5 rounded-md relative flex flex-col cursor-pointer hover:scale-95 transition duration-500 hover:brightness-125">
      <h2>{name}</h2>
      <p>{description}</p>
      <i
        className={`fa-solid ${
          visibility === "public" ? " fa-unlock" : "fa-lock"
        } absolute right-2 bottom-2`}
      ></i>
    </article>
  );
}
