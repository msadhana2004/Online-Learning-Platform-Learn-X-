import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

function AddCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    instructor: "",
    category: "",
    price: "",
    video: "",
    image: "",
    about: "",
    level: "",
    duration: "",
    language: "",
    rating: "",
    reviews: "",
    enrolled: "",
    skills: "",
    tools: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login as admin first");
      setLoading(false);
      return;
    }

    const formattedCourse = {
      ...course,
      price: course.price ? parseFloat(course.price) : 0,
      rating: course.rating ? parseFloat(course.rating) : 0,
      reviews: course.reviews ? parseInt(course.reviews) : 0,
      enrolled: course.enrolled ? parseInt(course.enrolled) : 0,
      skills: course.skills ? course.skills.split(",").map((s) => s.trim()) : [],
      tools: course.tools ? course.tools.split(",").map((t) => t.trim()) : [],
    };

    try {
      const response = await fetch("http://localhost:8080/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedCourse),
      });

      if (!response.ok) throw new Error(await response.text());

      alert("Course added successfully 🎉");

      setCourse({
        title: "",
        instructor: "",
        category: "",
        price: "",
        video: "",
        image: "",
        about: "",
        level: "",
        duration: "",
        language: "",
        rating: "",
        reviews: "",
        enrolled: "",
        skills: "",
        tools: "",
      });

      navigate("/admin/manage-course");

    } catch (error) {
      console.error(error);
      alert("Failed to add course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      {/* PAGE */}
      <div className="animate-fade-in max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 animate-slide-down text-gray-800">
          Add New Course
        </h1>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl grid grid-cols-2 gap-4
                     animate-fade-in-up"
        >

          {[
            "title",
            "instructor",
            "category",
            "price",
            "video",
            "image",
            "level",
            "duration",
            "language",
            "rating",
            "reviews",
            "enrolled",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={course[field]}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400
                         outline-none transition hover:shadow-md"
            />
          ))}

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={course.skills}
            onChange={handleChange}
            className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="tools"
            placeholder="Tools (comma separated)"
            value={course.tools}
            onChange={handleChange}
            className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="about"
            placeholder="About Course"
            value={course.about}
            onChange={handleChange}
            className="p-3 border rounded-lg col-span-2 h-28 focus:ring-2 focus:ring-blue-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 transition transform hover:scale-[1.02]
                       active:scale-95"
          >
            {loading ? "Adding Course..." : "Add Course"}
          </button>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddCourse;