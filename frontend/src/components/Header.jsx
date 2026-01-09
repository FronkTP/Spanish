import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">logo</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all">1000</Link>
      </nav>
    </header>
  );
}
