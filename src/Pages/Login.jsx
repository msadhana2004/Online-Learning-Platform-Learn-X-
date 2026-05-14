import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/courses";

  // ✅ LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ store data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email);

        alert("Login Successful");
        navigate(from);
      } else {
        // ✅ FIX HERE
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  // ✅ REGISTER
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully");
        setIsRegister(false);

        // optional reset
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // ✅ FIX HERE
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-10">

        {/* Background */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl animate-bounce"></div>

        <div className="grid md:grid-cols-2 max-w-6xl w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">

          {/* Left */}
          <div className="hidden md:flex flex-col justify-center items-center p-10 text-white bg-gradient-to-br from-blue-800/70 to-slate-900/70">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Learning"
              className="rounded-2xl shadow-xl w-full h-72 object-cover mb-6"
            />

            <h2 className="text-3xl font-bold mb-3">
              {isRegister ? "Join LearnX Today" : "Welcome Back"}
            </h2>

            <p className="text-gray-200 text-center">
              Learn new skills, earn certificates, and grow your career.
            </p>
          </div>

          {/* Right */}
          <div className="p-8 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md text-white">

              <h2 className="text-3xl font-bold text-center mb-2">
                {isRegister ? "Create Account" : "Login"}
              </h2>

              <p className="text-center text-gray-300 mb-6">
                {isRegister
                  ? "Start your learning journey"
                  : "Sign in to continue"}
              </p>

              <div className="space-y-4">

                {isRegister && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  onClick={isRegister ? handleRegister : handleLogin}
                  className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl"
                >
                  {isRegister ? "Register" : "Login"}
                </button>
              </div>

              <p className="text-center mt-6 text-gray-300">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-orange-400 cursor-pointer"
                >
                  {isRegister ? "Login" : "Register"}
                </span>
              </p>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;