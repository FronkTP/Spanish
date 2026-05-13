import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function Header() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <header className="w-full bg-white shadow-xs border-b-2 border-primary">
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-3">
        <Link to="/" className="text-2xl text-primary font-bold">
          Spanish
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-text-muted hover:text-primary transition-colors"
          >
            Home
          </Link>
          {/* <Link to="/all">1000</Link> */}
          <Link
            to="/progress"
            className="text-text-muted hover:text-primary transition-colors"
          >
            Progress
          </Link>
          <Link
            to="/practice"
            className="text-text-muted hover:text-primary transition-colors"
          >
            Practice
          </Link>
          <Link
            to="/analyze"
            className="text-text-muted hover:text-primary transition-colors"
          >
            Analyze
          </Link>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
