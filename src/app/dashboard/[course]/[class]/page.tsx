export default function ClassPage({ params }: { params: { cls: string } }) {
  const { cls } = params;
  console.log(params);
  
  return (
    <div>
      <h1 className="text-[#333]">{cls}</h1>
    </div>
  );
}
