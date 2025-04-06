import React from 'react';
import useTheme from '../hooks/UseTheme';

const VisaSuccessStories = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stories = [
    {
      name: "Ayesha Rahman",
      country: "Canada",
      story: "Smart Visa helped me get my Canadian student visa in just 3 weeks! The platform was simple and transparent.",
      image: "https://i.ibb.co/N5sNfd8/person1.jpg",
    },
    {
      name: "Rahul Sharma",
      country: "Germany",
      story: "The guidance I got through this platform made my German work visa journey hassle-free.",
      image: "https://i.ibb.co/gFr67PWr/person2.jpg",
    },
    {
      name: "Fatima Noor",
      country: "UK",
      story: "I applied for a UK tourist visa and got it smoothly. Loved the support and clear instructions!",
      image: "https://i.ibb.co/GfNM0SsV/person3.jpg",
    },
  ];

  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-500">
        Visa Success Stories
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((person, idx) => (
          <div
            key={idx}
            className={`group rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 flex flex-col justify-between hover:bg-blue-900 ${
              isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <div className="flex flex-col items-center mb-6">
              <img
                src={person.image}
                alt={person.name}
                className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-lg mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-blue-400 group-hover:text-white">
                {person.name}
              </h3>
              <p
                className={`text-sm group-hover:text-white ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Visa for {person.country}
              </p>
            </div>

            <p
              className={`italic text-center group-hover:text-white ${
                isDark ? 'text-gray-300' : 'text-gray-800'
              }`}
            >
              "{person.story}"
            </p>

            <div className="mt-4">
              <span className="inline-block bg-blue-500 text-white text-xs font-semibold rounded-full px-3 py-1">
                Success Story
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaSuccessStories;
