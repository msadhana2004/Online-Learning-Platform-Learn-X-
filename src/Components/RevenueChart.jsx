import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function RevenueChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchRevenue = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8080/api/admin/reports", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }

                const result = await res.json();
                setData(result.revenueData || []);

            } catch (err) {
                console.error("Error fetching revenue:", err);
            }
        };

        // ✅ First call
        fetchRevenue();

        // ✅ Auto refresh
        const interval = setInterval(fetchRevenue, 5000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#1E3A8A"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}