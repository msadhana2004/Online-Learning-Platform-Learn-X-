import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#1e3a8a]/80 to-[#0f172a]/90"></div>

        {/* Animated Blur Circles */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-blue-400/20 rounded-full blur-3xl animate-bounce"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="uppercase tracking-[6px] text-orange-400 text-sm mb-4 animate-bounce">
            Welcome To LearnX
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fadeIn">
            Upgrade Your <span className="text-orange-400">Skills</span> <br />
            Shape Your <span className="text-cyan-300">Future</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 animate-pulse">
            Premium courses, expert mentors, real certifications and career-ready learning platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/courses")}
              className="bg-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-600 hover:scale-110 transition duration-300 shadow-xl"
            >
              Explore Courses
            </button>

            <button
              onClick={() => navigate("/freecourse")}
              className="bg-white/10 backdrop-blur-md border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black hover:scale-110 transition duration-300"
            >
              Free Courses
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 animate-pulse">
            Why Choose LearnX?
          </h2>
          <p className="text-gray-500 mb-12">
            Learn smarter with modern education tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎥",
                title: "Live Multimedia Classes",
                desc: "Smart interactive sessions with HD classes.",
              },
              {
                icon: "📚",
                title: "Unlimited Resources",
                desc: "Books, notes, quizzes and premium materials.",
              },
              {
                icon: "🚀",
                title: "Career Support",
                desc: "Certificates, resume help & placement guidance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-500"
              >
                <div className="text-5xl mb-4 animate-bounce">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
            Popular Courses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
                title: "Complete Web Design",
              },
              {
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
                title: "Become a SuperLearner",
              },
              {
                img: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
                title: "NLP Certification",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={course.img}
                    alt="course"
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-800 mb-4">
                    {course.title}
                  </h3>

                  <button
                    onClick={() => navigate("/courses")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 hover:scale-105 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="about"
            className="rounded-3xl shadow-xl w-full hover:scale-105 transition duration-700"
          />

          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-5 animate-pulse">
              About LearnX
            </h2>

            <p className="text-gray-600 leading-7 mb-6">
              LearnX delivers world-class education with practical skills,
              expert mentorship, certifications, and career-focused learning.
            </p>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 hover:scale-110 transition duration-300 shadow-lg">
              Read More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;