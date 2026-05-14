import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function FreeCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  // 🔒 Login check (FIXED KEY)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  // 🔎 Fetch course
  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleEnroll = () => {
    navigate(`/watch-video/${course.id}`);
  };

  // LOADING / ERROR UI
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <p className="text-xl font-semibold animate-pulse">
            Loading Course...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100">

        {/* HERO SECTION */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-6 md:px-20 py-16 overflow-hidden">

          {/* glow effects */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-400/20 blur-3xl rounded-full"></div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {course.title}
          </h1>

          <p className="text-gray-200 max-w-3xl mb-6">
            {course.about}
          </p>

          <p className="mb-2">
            👨‍🏫 Instructor:{" "}
            <span className="font-semibold">{course.instructor}</span>
          </p>

          {course.rating && (
            <p className="mb-1 text-yellow-300">
              ⭐ {course.rating} ({course.reviews} reviews)
            </p>
          )}

          {course.enrolled && (
            <p className="mb-6 text-gray-300">
              🎓 {course.enrolled} students enrolled
            </p>
          )}

          <button
            onClick={handleEnroll}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Start Learning
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 space-y-12">

          {/* ABOUT */}
          {course.about && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600 leading-7">{course.about}</p>
            </div>
          )}

          {/* SKILLS */}
          {course.skills?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Skills You'll Gain</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {course.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl text-center shadow hover:scale-105 transition"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOOLS */}
          {course.tools?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tools You'll Learn</h2>

              <div className="flex flex-wrap gap-3">
                {course.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:scale-105 transition"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* COURSE DETAILS CARD */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Course Details</h2>

            <div className="space-y-2 text-gray-700">
              {course.level && <p>📌 Level: {course.level}</p>}
              {course.duration && <p>⏳ Duration: {course.duration}</p>}
              {course.language && <p>🌍 Language: {course.language}</p>}
              <p>🎓 Certificate Available</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FreeCourseDetails;