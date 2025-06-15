
import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";

const WhyChooseUsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-8">Why Choose Our Courses?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-royal/10 p-4 mb-4">
                            <GraduationCap className="h-8 w-8 text-royal" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Expert Educators</h3>
                        <p className="text-gray-600">Learn from experienced IITians who understand what it takes to succeed</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-royal/10 p-4 mb-4">
                            <BookOpen className="h-8 w-8 text-royal" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
                        <p className="text-gray-600">Access notes, videos, practice tests, and personalized feedback</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-royal/10 p-4 mb-4">
                            <CheckCircle className="h-8 w-8 text-royal" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                        <p className="text-gray-600">Join thousands of successful students who achieved their academic goals</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
