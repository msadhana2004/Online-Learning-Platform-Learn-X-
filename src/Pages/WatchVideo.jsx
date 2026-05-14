import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function WatchVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);

  // LOGIN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `http://localhost:8080/api/courses/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!res.ok) throw new Error("Course not found");

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.log(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // 30 sec timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoCompleted(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // CERTIFICATE
  const handleCertificate = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(
        "http://localhost:8080/api/certificate/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            userId: Number(userId),
            courseId: Number(id),
          }),
        }
      );

      if (!res.ok) throw new Error("Certificate failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      a.click();
    } catch (err) {
      console.log(err);
      alert("Certificate generation failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg animate-pulse">Loading Course...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-600">
          Course Not Found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 p-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

          {/* VIDEO SECTION */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4">

            <h1 className="text-2xl font-bold mb-4 text-blue-700">
              {course.title}
            </h1>

            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="450"
                src={course.video}
                title="Course Video"
                allowFullScreen
              ></iframe>
            </div>

            {!videoCompleted && (
              <p className="mt-4 text-gray-600 animate-pulse">
                ⏳ Watch for 30 seconds to unlock completion...
              </p>
            )}

            {videoCompleted && !completed && (
              <button
                onClick={() => setCompleted(true)}
                className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Mark as Completed
              </button>
            )}

            {completed && (
              <button
                onClick={handleCertificate}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                🎓 Generate Certificate
              </button>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-3">
              Course Progress
            </h2>

            <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: completed ? "100%" : videoCompleted ? "60%" : "20%" }}
              ></div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {completed
                ? "Completed 🎉"
                : videoCompleted
                  ? "In Progress..."
                  : "Not Started"}
            </p>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">What you will learn</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✔ Video-based learning</li>
                <li>✔ Real-world concepts</li>
                <li>✔ Certificate after completion</li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/my-courses")}
              className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black"
            >
              Back to My Courses
            </button>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default WatchVideo;