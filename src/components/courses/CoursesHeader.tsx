
import { motion } from "framer-motion";

const CoursesHeader = () => {
    return (
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Premium Courses
                </motion.h1>
                <motion.p
                    className="text-xl max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Accelerate your learning with our expert-crafted courses designed for academic excellence
                </motion.p>
            </div>
        </section>
    );
};

export default CoursesHeader;
