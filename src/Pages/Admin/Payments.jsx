import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

function Payments() {

    const [payments, setPayments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Login required");
            return;
        }

        fetch("http://localhost:8080/api/admin/payments", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Access Denied");
                return res.json();
            })
            .then(data => setPayments(data))
            .catch(err => {
                console.error(err);
                setError(err.message);
            });

    }, []);

    return (
        <AdminLayout>

            <h1 className="text-2xl font-bold mb-4">Payments</h1>

            {error && <p className="text-red-500">{error}</p>}

            <table className="w-full border">

                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">User ID</th>
                        <th className="p-2">Course ID</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>

                <tbody>

                    {payments.length > 0 ? (
                        payments.map(p => (
                            <tr key={p.id} className="border">
                                <td className="p-2">{p.userId}</td>
                                <td className="p-2">{p.courseId}</td>
                                <td className="p-2">₹{p.amount}</td>
                                <td className="p-2 text-green-600">{p.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No Payments Found
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>

        </AdminLayout>
    );
}

export default Payments;