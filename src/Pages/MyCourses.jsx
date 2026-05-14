import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function MyCourses() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        fetch(`http://localhost:8080/api/enroll/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setEnrollments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert("Unable to load enrolled courses");
                setLoading(false);
            });
    }, [navigate]);

    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 py-16 px-6">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800">
                        🎓 My Learning
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Continue your learning journey
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <p className="text-center text-gray-500 animate-pulse">
                        Loading your courses...
                    </p>
                )}

                {/* EMPTY STATE */}
                {!loading && enrollments.length === 0 && (
                    <div className="text-center text-gray-600 mt-10">
                        <p className="text-lg">You are not enrolled in any courses yet 😕</p>

                        <button
                            onClick={() => navigate("/courses")}
                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                        >
                            Explore Courses
                        </button>
                    </div>
                )}

                {/* COURSES GRID */}
                {!loading && enrollments.length > 0 && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                        {enrollments.map((enroll) => (
                            <div
                                key={enroll.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-2 p-6"
                            >

                                {/* Course Icon */}
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-4 text-xl">
                                    📘
                                </div>

                                <h2 className="text-lg font-bold text-slate-800 mb-2">
                                    Course ID: {enroll.courseId}
                                </h2>

                                {/* Status Badge */}
                                <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                    {enroll.status}
                                </span>

                                {/* Buttons */}
                                <div className="flex flex-col gap-3">

                                    <button
                                        onClick={() =>
                                            navigate(`/watch-video/${enroll.courseId}`)
                                        }
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
                                    >
                                        ▶ Watch Course
                                    </button>

                                    <button
                                        onClick={() => navigate("/certificate")}
                                        className="bg-green-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
                                    >
                                        🎓 Certificate
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}

export default MyCourses;