import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= USER PAGES ================= */
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import FreeCourse from "./Pages/FreeCourse";
import CourseDetails from "./Pages/CourseDetails";
import FreeCourseDetails from "./Pages/FreeCourseDetails";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MyCourses from "./Pages/MyCourses";

import Payment from "./Pages/Payment";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentComplete from "./Pages/PaymentComplete";

import WatchVideo from "./Pages/WatchVideo";
import Certificate from "./Pages/Certificate";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddCourse from "./Pages/Admin/AddCourse";
import ManageCourses from "./Pages/Admin/ManageCourses"; // ✅ Corrected
import EditCourse from "./Pages/Admin/EditCourse";

import ManageInstructors from "./Pages/Admin/ManageInstructors";
import ManageUsers from "./Pages/Admin/ManageUsers";
import Notifications from "./Pages/Admin/Notifications";
import Payments from "./Pages/Admin/Payments";
import Reports from "./Pages/Admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/freecourse" element={<FreeCourse />} />
        <Route path="/freecourse/:id" element={<FreeCourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />

        {/* ================= PAYMENT ROUTES ================= */}
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/payment-success/:id" element={<PaymentSuccess />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />

        {/* ================= LEARNING ================= */}
        <Route path="/watch-video/:id" element={<WatchVideo />} />
        <Route path="/certificate" element={<Certificate />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/manage-course" element={<ManageCourses />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route path="/admin/manage-instructor" element={<ManageInstructors />} />
        <Route path="/admin/manage-user" element={<ManageUsers />} />
        <Route path="/admin/notification" element={<Notifications />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl font-bold">
              404 Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;