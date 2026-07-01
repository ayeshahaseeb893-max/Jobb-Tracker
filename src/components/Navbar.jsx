import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/applications">Applications</Link>
    </nav>
  );
}

export default Navbar;