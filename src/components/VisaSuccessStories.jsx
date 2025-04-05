import React from 'react';

const VisaSuccessStories = () => {
  const stories = [
    {
      name: "Ayesha Rahman",
      country: "Canada",
      story: "Smart Visa helped me get my Canadian student visa in just 3 weeks! The platform was simple and transparent.",
      image: "https://i.ibb.co.com/N5sNfd8/person1.jpg",
    },
    {
      name: "Rahul Sharma",
      country: "Germany",
      story: "The guidance I got through this platform made my German work visa journey hassle-free.",
      image: "https://i.ibb.co.com/gFr67PWr/person2.jpg",
    },
    {
      name: "Fatima Noor",
      country: "UK",
      story: "I applied for a UK tourist visa and got it smoothly. Loved the support and clear instructions!",
      image: "https://i.ibb.co.com/GfNM0SsV/person3.jpg",
    },
  ];

  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">Visa Success Stories</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((person, idx) => (
          <div
            key={idx}
            className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center mb-6">
              <img
                src={person.image}
                alt={person.name}
                className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-blue-800">{person.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visa for {person.country}</p>
            </div>
            <p className="text-gray-800 dark:text-gray-300 italic text-center">
              "{person.story}"
            </p>
            <div className="mt-4">
              <span className="inline-block bg-blue-500 text-white text-xs font-semibold rounded-full px-3 py-1">Success Story</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaSuccessStories;
