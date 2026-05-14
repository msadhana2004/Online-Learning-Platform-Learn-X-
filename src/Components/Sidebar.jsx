import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", to: "/admin", icon: "📊" },
    { name: "Add Course", to: "/admin/add-course", icon: "➕" },
    { name: "Manage Courses", to: "/admin/manage-course", icon: "📚" },
    { name: "Manage Instructors", to: "/admin/manage-instructor", icon: "👨‍🏫" },
    { name: "Manage Users", to: "/admin/manage-user", icon: "👥" },
    { name: "Notifications", to: "/admin/notification", icon: "🔔" },
    { name: "Payments", to: "/admin/payments", icon: "💳" },
    { name: "Reports", to: "/admin/reports", icon: "📈" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-md">
        <h2 className="text-lg font-bold tracking-wide">Admin Panel</h2>

        <button
          onClick={() => setOpen(!open)}
          className="hover:scale-110 transition"
        >
          {open ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-72 h-full md:min-h-screen
          bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#2563eb]
          text-white p-6
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          🚀 Admin Panel
        </h2>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl 
              hover:bg-white/10 hover:scale-105 transition duration-300"
            >
              <span className="text-lg group-hover:scale-125 transition">
                {link.icon}
              </span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 text-xs text-white/60">
          LearnX Admin v2.0
        </div>
      </aside>
    </>
  );
}