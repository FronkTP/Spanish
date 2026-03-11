import { Link } from "react-router-dom";

export function PracticeModeCard({
  path,
  title,
  subtitle,
  bg,
  hoverBorder,
  Icon,
}) {
  return (
    <Link to={path}>
      <div
        className={`w-full p-4 flex gap-4 bg-white shadow-xs rounded-xl border border-gray-100 transition hover:-translate-y-1 ${hoverBorder}`}
      >
        <div
          className={`h-20 w-20 flex justify-center items-center rounded-xl ${bg}`}
        >
          <Icon className="size-8 text-background-light" />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
