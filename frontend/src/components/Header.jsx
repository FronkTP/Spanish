import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-xs border-b-2 border-primary">
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-3">
        <Link to="/" className="text-2xl text-primary font-bold">
          Spanish
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Home
          </Link>
          {/* <Link to="/all">1000</Link> */}
          <Link
            to="/progress"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Progress
          </Link>
          <Link
            to="/practice"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Practice
          </Link>
        </nav>
      </div>
    </header>
  );
}
