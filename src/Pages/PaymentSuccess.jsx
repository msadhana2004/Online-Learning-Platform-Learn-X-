import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function PaymentSuccess() {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { course, total } = location.state || {};
    const [upi, setUpi] = useState("");

    if (!course) {
        return (
            <>
                <Navbar />
                <h1 className="text-center mt-20 text-red-600 text-2xl">
                    No payment data found
                </h1>
                <Footer />
            </>
        );
    }

    const handlePay = () => {

        if (!upi) {
            alert("Enter UPI ID");
            return;
        }

        // save payment
        const paymentData = {
            id: id,
            course: course.title,
            price: total,
            upi: upi,
            date: new Date().toLocaleString()
        };

        const existing = JSON.parse(localStorage.getItem("payments")) || [];
        existing.push(paymentData);

        localStorage.setItem("payments", JSON.stringify(existing));

        // simulate payment success
        setTimeout(() => {
            navigate("/payment-complete", {
                state: { course, total }
            });
        }, 1500);

    };

    return (
        <>
            <Navbar />

            <section className="bg-gray-100 min-h-screen flex justify-center items-center">

                <div className="bg-white shadow-lg rounded-lg p-8 w-[420px]">

                    <h2 className="text-xl font-bold text-center mb-4">
                        UPI Payment
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter UPI ID (example@upi)"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        className="w-full border p-3 rounded-md mb-4"
                    />

                    <p className="text-center text-sm mb-3">
                        Scan QR Code
                    </p>

                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${upi}&pn=CoursePayment&am=${total}&cu=INR`}
                        alt="QR"
                        className="mx-auto mb-4"
                    />

                    <div className="bg-gray-100 p-3 rounded text-sm mb-4">
                        <p>Course: {course.title}</p>
                        <p>Total: ₹{total}</p>
                    </div>

                    <button
                        onClick={handlePay}
                        className="bg-blue-600 text-white w-full py-3 rounded-md"
                    >
                        Pay Now
                    </button>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default PaymentSuccess;