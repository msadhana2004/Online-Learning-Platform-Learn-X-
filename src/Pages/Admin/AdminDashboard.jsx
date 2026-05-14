import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import StatsCard from "../../Components/StatsCard";
import { UserIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import AddCourse from "./AddCourse";
// import { motion } from "framer-motion";

function AdminDashboard() {

    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalPayments: 0
    });

    const token = localStorage.getItem("token");

    useEffect(() => {

        const fetchDashboard = async () => {
            try {

                // 📚 Courses
                const courseRes = await fetch("http://localhost:8080/api/admin/courses", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!courseRes.ok) throw new Error("Failed to fetch courses");

                const courseData = await courseRes.json();
                setCourses(courseData || []);

                // 📊 Stats
                const reportRes = await fetch("http://localhost:8080/api/admin/reports", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!reportRes.ok) throw new Error("Failed to fetch reports");

                const reportData = await reportRes.json();
                setStats(reportData || {
                    totalUsers: 0,
                    totalCourses: 0,
                    totalPayments: 0
                });

            } catch (err) {
                console.error("Dashboard error:", err);
            }
        };

        fetchDashboard();

        const interval = setInterval(fetchDashboard, 10000); // safer refresh (10s)

        return () => clearInterval(interval);

    }, [token]);

    // ✅ FIX: safe state update
    const handleCourseAdded = (newCourse) => {
        setCourses((prev) => [...prev, newCourse]);
    };

    return (
        <AdminLayout>

            <h1 className="text-2xl font-bold mb-6">
                Admin Dashboard
            </h1>

            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">

                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<UserIcon className="w-6 h-6 text-blue-600" />}
                />

                <StatsCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon="📚"
                />

                <StatsCard
                    title="Revenue"
                    value={`₹${stats.totalPayments * 1000}`}
                    icon={<CurrencyRupeeIcon className="w-6 h-6 text-green-600" />}
                />

                <StatsCard
                    title="Enrollments"
                    value={stats.totalPayments}
                    icon="📝"
                />

            </div>

            {/* ADD COURSE */}
            <AddCourse onCourseAdded={handleCourseAdded} />

            {/* COURSES */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">

                {/* FREE */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Free Courses</h2>
                    <ul className="space-y-2">
                        {courses
                            .filter(c => c.price === 0)
                            .map(c => (
                                <li key={c.id} className="border-b pb-2">
                                    {c.title} - {c.instructor}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* PAID */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Paid Courses</h2>
                    <ul className="space-y-2">
                        {courses
                            .filter(c => c.price > 0)
                            .map(c => (
                                <li key={c.id} className="border-b pb-2">
                                    {c.title} - {c.instructor}
                                </li>
                            ))}
                    </ul>
                </div>

            </div>

        </AdminLayout>
    );
}

export default AdminDashboard;