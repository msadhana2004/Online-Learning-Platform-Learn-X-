import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Certificate() {

    const location = useLocation();

    const username =
        localStorage.getItem("username") ||
        localStorage.getItem("email") ||
        "Student";

    const courseName = location.state?.courseName || "Course";

    const today = new Date().toLocaleDateString();

    // safe certificate id
    const [certificateId] = useState("LX-" + new Date().getTime());

    const handleDownload = () => {
        window.print();
    };

    return (
        <> <div className="print:hidden"> <Navbar /> </div>

            <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">

                <div
                    id="certificate"
                    className="bg-white w-[1000px] p-12 rounded-lg shadow-xl border-[8px] border-yellow-400 text-center"
                >

                    <h2 className="text-3xl font-bold mb-2 text-blue-900">
                        LearnX Institute
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Online Learning Platform
                    </p>

                    <h1 className="text-5xl font-serif mb-10">
                        Certificate of Completion
                    </h1>

                    <p className="text-gray-600 text-lg mb-6">
                        This certificate is proudly presented to
                    </p>

                    <h2 className="text-5xl font-bold text-blue-800 mb-8">
                        {username}
                    </h2>

                    <p className="text-gray-700 text-lg mb-4">
                        for successfully completing the course
                    </p>

                    <h3 className="text-3xl font-semibold text-blue-700 mb-10">
                        {courseName}
                    </h3>

                    <p className="text-gray-600 mb-10">
                        Your dedication and commitment to learning have been truly commendable.
                    </p>

                    <div className="flex justify-between mt-12 px-16 text-center">

                        <div>
                            <div className="border-t w-40 mx-auto mb-2"></div>
                            <p className="font-semibold">Instructor</p>
                        </div>

                        <div>
                            <div className="border-t w-40 mx-auto mb-2"></div>
                            <p className="font-semibold">Director</p>
                        </div>

                    </div>

                    <div className="flex justify-between mt-10 text-gray-500 text-sm px-10">
                        <p>Date: {today}</p>
                        <p>Certificate ID: {certificateId}</p>
                    </div>

                </div>

                <button
                    onClick={handleDownload}
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 print:hidden"
                >
                    Download Certificate
                </button>

            </section>

            <div className="print:hidden">
                <Footer />
            </div>
        </>


    );
}

export default Certificate;
