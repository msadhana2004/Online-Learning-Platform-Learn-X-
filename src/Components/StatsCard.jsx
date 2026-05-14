import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon }) {
    return (
        <motion.div
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="text-3xl">{icon}</div>
            <div>
                <h2 className="text-gray-600 font-semibold">{title}</h2>
                <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
        </motion.div>
    );
}