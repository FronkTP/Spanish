import { Link } from "react-router-dom";

export default function ProfileMenu({ isOpen, onLogout }) {
  return (
    isOpen && (
      <div className="absolute right-0 top-full">
        <div>
          <p>name</p>
          <p>email</p>
        </div>
        <div>
          <Link to="/progress">
            progress
          </Link>
        </div>
        <div>
          <button onClick={onLogout}>logout</button>
        </div>
      </div>
    )
  );
}
