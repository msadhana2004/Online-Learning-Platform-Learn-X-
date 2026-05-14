import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.log(err));
  }, [id]);

  const toggleModule = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("Please login first");
      navigate("/login", { state: { from: `/courses/${id}` } });
      return;
    }

    try {
      // FREE COURSE
      if (course.price === 0) {
        const res = await fetch("http://localhost:8080/api/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            userId: Number(userId),
            courseId: Number(id),
            status: "ENROLLED",
          }),
        });

        if (res.ok) {
          alert("Enrollment Successful 🎉");
          navigate("/my-courses");
        } else {
          alert("Enrollment Failed");
        }
      }

      // PAID COURSE
      else {
        navigate(`/payment/${course.id}`, {
          state: { course, total: course.price },
        });
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  // LOADING UI
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-blue-50">
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

          {/* Glow effects */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-400/20 blur-3xl rounded-full"></div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {course.title}
          </h1>

          <p className="mb-2 text-gray-200">
            👨‍🏫 Instructor:{" "}
            <span className="font-semibold">{course.instructor}</span>
          </p>

          {course.rating && (
            <p className="mb-6 text-yellow-300">
              ⭐ {course.rating} ({course.reviews} reviews)
            </p>
          )}

          <button
            onClick={handleBuy}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            {course.price === 0
              ? "Enroll Now"
              : `Buy Now ₹${course.price}`}
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 space-y-12">

          {/* ABOUT */}
          {course.about && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                About This Course
              </h2>
              <p className="text-gray-600 leading-7">
                {course.about}
              </p>
            </div>
          )}

          {/* OUTLINE */}
          {course.outline?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Course Outline
              </h2>

              <div className="space-y-4">
                {course.outline.map((module, index) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-slate-800">
                        📘 {module.title}
                      </span>

                      <span className="text-blue-600 font-bold text-xl">
                        {activeIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    {activeIndex === index && (
                      <div className="px-5 pb-5 text-gray-600 border-t">
                        {module.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {course.skills?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Skills You'll Gain
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {course.skills.map((skill, index) => (
                  <div
                    key={index}
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
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Tools You'll Learn
              </h2>

              <div className="flex flex-wrap gap-3">
                {course.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:scale-105 transition"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CourseDetails;