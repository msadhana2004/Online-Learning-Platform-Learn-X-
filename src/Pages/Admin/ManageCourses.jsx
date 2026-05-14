import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Modal from "../../Components/Modal";

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchCourses = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);

            const res = await fetch("http://localhost:8080/api/admin/courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setCourses(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        const token = localStorage.getItem("token");

        try {
            await fetch(
                `http://localhost:8080/api/admin/courses/${selectedCourse.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setModalOpen(false);
            setSelectedCourse(null);
            fetchCourses();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>

            <div className="animate-fade-in">

                <h1 className="text-3xl font-bold mb-6 animate-slide-down">
                    Manage Courses
                </h1>

                <div className="overflow-x-auto bg-white rounded-xl shadow-lg animate-fade-in-up">

                    <table className="min-w-full">

                        {/* HEADER */}
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Instructor</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>

                            {/* LOADING */}
                            {loading && (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500 animate-pulse">
                                        Loading courses...
                                    </td>
                                </tr>
                            )}

                            {/* EMPTY STATE */}
                            {!loading && courses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500 animate-fade-in">
                                        No Courses Found
                                    </td>
                                </tr>
                            )}

                            {/* DATA */}
                            {!loading && courses.map((c, index) => (
                                <tr
                                    key={c.id}
                                    className="border-t hover:bg-gray-50 transition duration-200 transform hover:scale-[1.01] animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td className="px-4 py-3 font-medium">{c.title}</td>
                                    <td className="px-4 py-3">{c.instructor}</td>
                                    <td className="px-4 py-3">
                                        {c.price === 0 ? "Free" : `₹${c.price}`}
                                    </td>
                                    <td className="px-4 py-3">{c.category}</td>

                                    <td className="px-4 py-3">

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/edit-course/${c.id}`)
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded mr-2
                                                       hover:bg-green-600 active:scale-95 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(c)}
                                            className="bg-red-500 text-white px-3 py-1 rounded
                                                       hover:bg-red-600 active:scale-95 transition"
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="animate-fade-in">
                    <Modal open={modalOpen} setOpen={setModalOpen}>
                        <div className="animate-fade-in-up">

                            <h2 className="text-lg font-bold">
                                Delete Course
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Are you sure you want to delete
                                <span className="font-semibold"> "{selectedCourse?.title}"</span>?
                            </p>

                            <div className="mt-4 flex justify-end space-x-2">

                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded
                                               hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded
                                               hover:bg-red-700 active:scale-95 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </Modal>
                </div>
            )}

        </AdminLayout>
    );
}

export default ManageCourses;