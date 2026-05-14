import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

function Notifications() {

    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    const token = localStorage.getItem("token");

    // FETCH
    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:8080/api/admin/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setNotifications(Array.isArray(data) ? data : []);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const interval = setInterval(fetchNotifications, 8000);
        return () => clearInterval(interval);

    }, []);

    // SEND
    const sendNotification = async (e) => {
        e.preventDefault();

        if (!message || !userId) {
            alert("Message & User ID required");
            return;
        }

        try {
            setSending(true);

            const res = await fetch("http://localhost:8080/api/admin/notifications", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    userId: Number(userId)
                })
            });

            const data = await res.json();

            setNotifications(prev => [...prev, data]);

            setMessage("");
            setUserId("");

        } catch (err) {
            console.log(err);
        } finally {
            setSending(false);
        }
    };

    return (
        <AdminLayout>

            <div className="animate-fade-in space-y-8">

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-blue-900">
                    Notifications 📢
                </h1>

                {/* FORM */}
                <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition">

                    <form onSubmit={sendNotification} className="space-y-4">

                        <input
                            type="number"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
                        />

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
                            placeholder="Write notification..."
                        />

                        <button
                            type="submit"
                            disabled={sending}
                            className={`w-full py-3 rounded text-white transition transform hover:scale-105 ${sending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {sending ? "Sending..." : "Send Notification"}
                        </button>

                    </form>

                </div>

                {/* LIST */}
                <div className="bg-white shadow-xl rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Sent Notifications
                    </h2>

                    {loading ? (
                        <p className="animate-pulse text-gray-500">
                            Loading notifications...
                        </p>
                    ) : notifications.length === 0 ? (
                        <p className="text-gray-500">No notifications sent yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 transition"
                                >

                                    <span className="font-medium">
                                        {n.message}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        User ID: {n.userId}
                                    </span>

                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>

        </AdminLayout>
    );
}

export default Notifications;