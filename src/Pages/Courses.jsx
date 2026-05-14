import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // fetch courses
  useEffect(() => {
    fetch("http://localhost:8080/api/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 py-16">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Explore Courses 🚀
          </h1>
          <p className="text-gray-500 mt-2">
            Learn new skills and upgrade your career
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading courses...
          </p>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <p className="text-center text-gray-500">
            No courses available
          </p>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-16">

          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-48 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Badge */}
                <span
                  className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white ${course.price === 0 ? "bg-green-500" : "bg-orange-500"
                    }`}
                >
                  {course.price === 0 ? "FREE" : "PAID"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  👨‍🏫 {course.instructor}
                </p>

                <p className="font-bold text-blue-600 mb-4">
                  {course.price === 0 ? "Free" : `₹${course.price}`}
                </p>

                <button
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition"
                >
                  {course.price === 0 ? "Enroll Now" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Courses;