import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

function ManageInstructors() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newInstructor, setNewInstructor] = useState({
        name: "",
        email: "",
        course: "",
        quality: "Good",
    });

    // FETCH
    const fetchInstructors = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/api/admin/instructors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setInstructors(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const handleChange = (e) => {
        setNewInstructor({
            ...newInstructor,
            [e.target.name]: e.target.value,
        });
    };

    // ADD
    const addInstructor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/api/admin/instructors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newInstructor),
            });

            const data = await res.json();
            setInstructors((prev) => [...prev, data]);

            setNewInstructor({
                name: "",
                email: "",
                course: "",
                quality: "Good",
            });

        } catch (err) {
            console.error(err);
        }
    };

    // DELETE
    const deleteInstructor = async (id) => {
        const token = localStorage.getItem("token");

        if (!window.confirm("Delete this instructor?")) return;

        await fetch(`http://localhost:8080/api/admin/instructors/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setInstructors(instructors.filter((i) => i.id !== id));
    };

    return (
        <AdminLayout>
            <div className="animate-fade-in space-y-10">

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-blue-900">
                    Instructor Management 🎓
                </h1>

                {/* FORM CARD */}
                <form
                    onSubmit={addInstructor}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 max-w-3xl"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        Add New Instructor
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            name="name"
                            placeholder="Name"
                            value={newInstructor.name}
                            onChange={handleChange}
                            className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            value={newInstructor.email}
                            onChange={handleChange}
                            className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            name="course"
                            placeholder="Course"
                            value={newInstructor.course}
                            onChange={handleChange}
                            className="border p-3 rounded focus:ring-2 focus:ring-blue-400"
                        />

                        <select
                            name="quality"
                            value={newInstructor.quality}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        >
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Average</option>
                        </select>
                    </div>

                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition">
                        Add Instructor
                    </button>
                </form>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <div className="p-4 border-b font-bold text-lg">
                        Instructor List
                    </div>

                    {loading ? (
                        <p className="p-6 animate-pulse">Loading instructors...</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Quality</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {instructors.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center p-6 text-gray-500">
                                            No instructors found
                                        </td>
                                    </tr>
                                ) : (
                                    instructors.map((inst) => (
                                        <tr
                                            key={inst.id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="p-4">{inst.name}</td>
                                            <td>{inst.email}</td>
                                            <td>{inst.course}</td>
                                            <td>{inst.quality}</td>
                                            <td>
                                                <button
                                                    onClick={() => deleteInstructor(inst.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:scale-105 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default ManageInstructors;