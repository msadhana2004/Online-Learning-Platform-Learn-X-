import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email");

  // FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/courses/${id}`
        );

        if (!res.ok) throw new Error("Course fetch failed");

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // PAYMENT
  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          userId: Number(userId),
          courseId: Number(id),
        }),
      });

      // Handle API errors
      if (!res.ok) {
        const msg = await res.text();

        // If already enrolled → still allow access
        if (msg.includes("Already enrolled")) {
          alert("You are already enrolled. Redirecting to course...");
          navigate(`/watch-video/${id}`);
          return;
        }

        throw new Error(msg);
      }

      alert("Payment Successful 🎉");

      // ✅ Direct navigation to watch video
      navigate(`/watch-video/${id}`);

    } catch (err) {
      console.error(err);
      alert(err.message || "Payment Failed ❌");
    }
  };

  // LOADING
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <p className="text-lg animate-pulse">Loading Payment...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ERROR
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
        <Footer />
      </>
    );
  }

  // COURSE NOT FOUND
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Course not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 flex items-center justify-center px-6">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6">
            <h1 className="text-2xl font-bold">Secure Checkout 🔐</h1>
            <p className="text-sm text-gray-200 mt-1">
              Complete your payment to access the course
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-5">

            {/* USER */}
            <div className="text-sm text-gray-600">
              👤 Logged in as:{" "}
              <span className="font-semibold text-black">
                {userEmail || "User"}
              </span>
            </div>

            {/* COURSE DETAILS */}
            <div className="border rounded-xl p-4 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">
                {course.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Instructor: {course.instructor}
              </p>
            </div>

            {/* PRICE */}
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
              <span className="font-semibold text-slate-700">
                Total Amount
              </span>
              <span className="text-xl font-bold text-blue-700">
                ₹{course.price}
              </span>
            </div>

            {/* BUTTON */}
            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition"
            >
              Pay ₹{course.price}
            </button>

            <p className="text-xs text-center text-gray-400">
              🔒 Secure payment powered by LearnX system
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Payment;