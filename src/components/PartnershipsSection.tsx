
import React from "react";

const partners = [
  {
    name: "TechLearn",
    logo: "https://via.placeholder.com/200x80?text=TechLearn",
  },
  {
    name: "EduConnect",
    logo: "https://via.placeholder.com/200x80?text=EduConnect",
  },
  {
    name: "FutureSkills",
    logo: "https://via.placeholder.com/200x80?text=FutureSkills",
  },
  {
    name: "DataMinds",
    logo: "https://via.placeholder.com/200x80?text=DataMinds",
  },
  {
    name: "InnoTech",
    logo: "https://via.placeholder.com/200x80?text=InnoTech",
  },
];

const PartnershipsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Initiative Companies</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with innovative companies to provide the best resources and opportunities for our students.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-card transition-all duration-300 hover:shadow-premium hover:-translate-y-1"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-16 object-contain mb-4"
              />
              <p className="text-gray-700 font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
