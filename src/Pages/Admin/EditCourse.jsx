import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        instructor: "",
        price: 0,
        category: ""
    });

    // 🔥 fetch course by id
    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch(`http://localhost:8080/api/admin/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error("❌ Fetch failed");
                    return;
                }

                const data = await res.json();

                // 🔥 safety fallback
                setCourse({
                    title: data.title || "",
                    instructor: data.instructor || "",
                    price: data.price || 0,
                    category: data.category || ""
                });

            } catch (err) {
                console.error(err);
            }
        };

        fetchCourse();
    }, [id]);

    // 🔥 update course
    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:8080/api/admin/courses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...course,
                    price: Number(course.price) // 🔥 fix number issue
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("❌ Update error:", text);
                return;
            }

            alert("✅ Course updated");

            // 🔥 force reload (fix 404 issue)
            navigate("/admin/manage-courses", { replace: true });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

            <form onSubmit={handleUpdate} className="space-y-4 max-w-md">

                <input
                    type="text"
                    placeholder="Title"
                    value={course.title}
                    onChange={(e) =>
                        setCourse({ ...course, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Instructor"
                    value={course.instructor}
                    onChange={(e) =>
                        setCourse({ ...course, instructor: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={course.price}
                    onChange={(e) =>
                        setCourse({ ...course, price: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={course.category}
                    onChange={(e) =>
                        setCourse({ ...course, category: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update Course
                </button>
            </form>
        </AdminLayout>
    );
}

export default EditCourse;