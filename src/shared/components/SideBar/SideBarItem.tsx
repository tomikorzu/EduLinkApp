import Link from "next/link";

export default function SideBarItem({
  icon,
  title,
  path,
}: {
  icon: string;
  title: string;
  path: string;
}) {
  return (
    <li className="w-full">
      <Link href={path} className="p-4 w-full flex gap-2 items-center">
        <i className={icon}></i>
        <span>{title}</span>
      </Link>
    </li>
  );
}
