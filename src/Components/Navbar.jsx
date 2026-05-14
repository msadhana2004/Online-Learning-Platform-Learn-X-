import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Better auth check
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // should be "ADMIN"

  const handleCoursesClick = () => {
    if (user) navigate("/courses");
    else navigate("/login");
    setMenuOpen(false);
  };

  const handleFreeCoursesClick = () => {
    if (user) navigate("/freecourse");
    else navigate("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:scale-105 transition duration-300"
        >
          <GraduationCap size={30} className="text-orange-400" />
          LearnX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">

          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>

          <button onClick={handleCoursesClick} className="hover:text-orange-400">
            Courses
          </button>

          <button onClick={handleFreeCoursesClick} className="hover:text-orange-400">
            Free Courses
          </button>

          {/* ✅ ADMIN PANEL */}
          {user && role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Admin Panel
            </button>
          )}

          {/* ✅ USER LOGGED IN */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 px-5 py-2 rounded-full hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#1E3A8A] overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
      >
        <div className="flex flex-col items-center gap-4 font-medium">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <button onClick={handleCoursesClick}>
            Courses
          </button>

          <button onClick={handleFreeCoursesClick}>
            Free Courses
          </button>

          {/* ✅ ADMIN PANEL */}
          {user && role === "ADMIN" && (
            <button
              onClick={() => {
                navigate("/admin/dashboard");
                setMenuOpen(false);
              }}
              className="bg-blue-500 px-5 py-2 rounded-full"
            >
              Admin Panel
            </button>
          )}

          {/* ✅ LOGOUT */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 px-5 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-orange-500 px-5 py-2 rounded-full"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;