import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="relative mt-16 text-white overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1E3A8A]/90 to-[#2563EB]/90"></div>

            <div className="relative z-10">
                {/* Main Footer */}
                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-orange-400 hover:scale-105 transition duration-300">
                            Learn<span className="text-white">X</span>
                        </h2>
                        <p className="mt-4 text-sm text-gray-300 leading-6">
                            LearnX is a modern e-learning platform providing high-quality
                            courses, certifications, and career growth opportunities.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-400 inline-block">
                            Navigation
                        </h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li>
                                <Link to="/" className="hover:text-orange-400 hover:pl-2 transition-all duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="hover:text-orange-400 hover:pl-2 transition-all duration-300">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/freecourse" className="hover:text-orange-400 hover:pl-2 transition-all duration-300">
                                    Free Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-orange-400 hover:pl-2 transition-all duration-300">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-400 inline-block">
                            Support
                        </h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li className="hover:text-orange-400 hover:pl-2 transition-all duration-300 cursor-pointer">
                                Help Center
                            </li>
                            <li className="hover:text-orange-400 hover:pl-2 transition-all duration-300 cursor-pointer">
                                Privacy Policy
                            </li>
                            <li className="hover:text-orange-400 hover:pl-2 transition-all duration-300 cursor-pointer">
                                Terms & Conditions
                            </li>
                            <li className="hover:text-orange-400 hover:pl-2 transition-all duration-300 cursor-pointer">
                                FAQ
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-400 inline-block">
                            Contact
                        </h3>
                        <div className="space-y-3 text-gray-300 text-sm">
                            <p>📍 Chennai, India</p>
                            <p>📞 +91 98765 43210</p>
                            <p>✉ support@learnx.com</p>
                            <p>🕒 Mon - Sat: 9AM - 6PM</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/20 text-center py-4 text-sm text-gray-300 backdrop-blur-sm">
                    © 2026 LearnX. All Rights Reserved. | Designed with ❤️
                </div>
            </div>
        </footer>
    );
}

export default Footer;