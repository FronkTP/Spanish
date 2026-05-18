import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { supabase } from "../services/supabaseClient";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const anchorRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const toggleShowProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showProfileMenu) return;

    const onMouseDown = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) {
        setShowProfileMenu(false);
        if (avatarButtonRef.current) {
          setTimeout(() => avatarButtonRef.current.focus(), 0);
        }
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowProfileMenu(false);
        if (avatarButtonRef.current) avatarButtonRef.current.focus();
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showProfileMenu]);

  const onLogout = async () => {
    const guestUser = localStorage.getItem("guestSession");

    if (guestUser) {
      localStorage.removeItem("guestSession");
      window.location.href = "/";
      return;
    }

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
        <div ref={anchorRef} className="flex relative items-center">
          <button
            ref={avatarButtonRef}
            onClick={toggleShowProfileMenu}
            aria-expanded={showProfileMenu}
            aria-haspopup="menu"
          >
            user avatar
          </button>
          <ProfileMenu isOpen={showProfileMenu} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
