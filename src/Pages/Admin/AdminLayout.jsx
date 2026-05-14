import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function AdminLayout({ children }) {

    const location = useLocation();

    const menu = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Add Course", path: "/admin/add-course" },
        { name: "Manage Courses", path: "/admin/manage-course" },
        { name: "Manage Instructors", path: "/admin/manage-instructor" },
        { name: "Manage Users", path: "/admin/manage-user" },
        { name: "Notifications", path: "/admin/notification" },
        { name: "Payments", path: "/admin/payments" },
        { name: "Reports", path: "/admin/reports" },
    ];

    return (
        <div className="min-h-screen flex flex-col">

            {/* Navbar */}
            <Navbar />

            {/* Body */}
            <div className="flex flex-1 bg-gray-100">

                {/* Sidebar */}
                <aside className="w-64 bg-[#1E3A8A] text-white min-h-screen p-6">

                    <h2 className="text-2xl font-bold mb-8">
                        Admin Panel
                    </h2>

                    <nav className="flex flex-col space-y-3">

                        {menu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded transition duration-200
                                ${location.pathname === item.path
                                        ? "bg-white text-[#1E3A8A] font-semibold"
                                        : "hover:text-orange-400"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                    </nav>

                </aside>

                {/* Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default AdminLayout;