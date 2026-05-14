import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function FreeCourse() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((res) => res.json())
            .then((data) => {
                const freeCourses = data.filter((c) => c.price === 0);
                setCourses(freeCourses);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const categories = [...new Set(courses.map((c) => c.category))];

    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 py-20 px-6 md:px-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                        Free Learning Hub 🎓
                    </h1>
                    <p className="text-gray-500 mt-3">
                        Learn skills for free and upgrade your career
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500 animate-pulse">
                        Loading free courses...
                    </p>
                )}

                {/* Empty */}
                {!loading && courses.length === 0 && (
                    <p className="text-center text-gray-500">
                        No free courses available
                    </p>
                )}

                {/* Categories */}
                {!loading &&
                    categories.map((category, index) => (
                        <div key={index} className="mb-16">

                            {/* Category Title */}
                            <h2 className="text-2xl font-bold mb-8 text-blue-800 border-l-4 border-blue-600 pl-3">
                                {category}
                            </h2>

                            {/* Course Grid */}
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                                {courses
                                    .filter((c) => c.category === category)
                                    .map((course) => (
                                        <div
                                            key={course.id}
                                            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition duration-500 hover:-translate-y-2"
                                        >

                                            {/* Image */}
                                            <div className="overflow-hidden">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="h-44 w-full object-cover group-hover:scale-110 transition duration-700"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/400x250?text=Course+Image";
                                                    }}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">

                                                <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
                                                    {course.title}
                                                </h3>

                                                <p className="text-gray-500 text-sm mb-2">
                                                    👨‍🏫 {course.instructor}
                                                </p>

                                                {/* FREE badge */}
                                                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4">
                                                    FREE COURSE
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/freecourse/${course.id}`)
                                                    }
                                                    className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </section>

            <Footer />
        </>
    );
}

export default FreeCourse;