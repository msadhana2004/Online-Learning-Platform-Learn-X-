import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // small animation on load
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-blue-50 px-6">

        <div
          className={`text-center bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full transition-all duration-700 transform ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-4xl">🎉</span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            Payment Successful
          </h1>

          {/* MESSAGE */}
          <p className="text-gray-600 mb-6">
            You have successfully enrolled in your course. Start learning now 🚀
          </p>

          {/* BUTTONS */}
          <div className="space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/my-courses")}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              View My Courses
            </button>

          </div>

          {/* FOOT NOTE */}
          <p className="text-xs text-gray-400 mt-5">
            Thank you for learning with LearnX 💙
          </p>
        </div>

      </section>

      <Footer />
    </>
  );
}

export default PaymentSuccess;