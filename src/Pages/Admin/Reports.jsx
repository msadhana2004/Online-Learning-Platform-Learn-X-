import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import RevenueChart from "../../Components/RevenueChart";

function Reports() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalPayments: 0,
    completionRate: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Admin token not found. Login required.");
        return;
      }

      const res = await fetch("http://localhost:8080/api/admin/reports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setStats({
        totalUsers: data.totalUsers || 0,
        totalCourses: data.totalCourses || 0,
        totalPayments: data.totalPayments || 0,
        completionRate: data.completionRate || 0
      });

      setLoading(false);

    } catch (err) {
      console.error("Error fetching reports:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // 🔥 Auto refresh every 5 seconds
    const interval = setInterval(fetchReports, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-8">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>

        {loading ? (
          <p className="text-gray-500">Loading reports...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-3xl font-bold mt-2 text-blue-600">
                  {stats.totalUsers}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
                <h2 className="text-lg font-semibold">Total Courses</h2>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  {stats.totalCourses}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
                <h2 className="text-lg font-semibold">Total Payments</h2>
                <p className="text-3xl font-bold mt-2 text-purple-600">
                  {stats.totalPayments}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
                <h2 className="text-lg font-semibold">Completion Rate</h2>
                <p className="text-3xl font-bold mt-2 text-orange-500">
                  {stats.completionRate}%
                </p>
              </div>

            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded shadow">
              <RevenueChart />
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Reports;
