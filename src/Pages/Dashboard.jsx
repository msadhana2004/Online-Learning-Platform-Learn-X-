import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const myCourses = [
    {
      id: 1,
      title: "React Mastery",
      progress: 75,
      lessons: "18/24 Lessons",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Spring Boot Advanced",
      progress: 50,
      lessons: "10/20 Lessons",
      color: "from-orange-500 to-orange-700",
    },
    {
      id: 3,
      title: "UI/UX Design Basics",
      progress: 35,
      lessons: "7/20 Lessons",
      color: "from-gray-700 to-black",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 px-6 md:px-12 py-16">

        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Continue learning and improve your skills
          </p>
        </div>

        {/* Course Cards */}
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          My Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {myCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-gradient-to-br ${course.color} text-white rounded-2xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition duration-500`}
            >
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>

              <p className="text-sm opacity-90 mb-4">
                {course.lessons}
              </p>

              {/* Progress */}
              <div className="bg-white/30 h-3 rounded-full overflow-hidden mb-5">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-700"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <button
                onClick={() => navigate(`/watch-video/${course.id}`)}
                className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">

          <h2 className="text-xl font-semibold mb-6 text-slate-800">
            📚 Upcoming Lessons
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="py-3">Lesson</th>
                  <th>Teacher</th>
                  <th>Duration</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="py-3">Introduction to React</td>
                  <td>John David</td>
                  <td>20 min</td>
                </tr>

                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="py-3">Spring Boot APIs</td>
                  <td>Alex Chen</td>
                  <td>25 min</td>
                </tr>

                <tr className="hover:bg-gray-50 transition">
                  <td className="py-3">UI Color Theory</td>
                  <td>Mia Roberts</td>
                  <td>18 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/watch-video/1")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition"
            >
              ▶ Continue Watching
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Dashboard;