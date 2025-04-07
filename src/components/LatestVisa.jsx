import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const LatestVisa = () => {
    const loadedVisa= useLoaderData();
    const [visas, setVisas] = useState(Array.isArray(loadedVisa) ? loadedVisa : []);

  useEffect(() => {
    fetch("https://visa-application-server-side.vercel.app/all-visas?limit=6") 
      .then((res) => res.json())
      .then((data) => setVisas(data))
      .catch((err) => 
        console.error("Error fetching latest visas:", err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Latest Visa Applications</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <div key={visa._id} className="shadow-lg rounded-lg p-4">
            <img src={visa.countryImage} alt={visa.countryName} 
            className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-bold mt-3">{visa.countryName}</h3>
            <p><strong>Visa Type:</strong> {visa.visaType}</p>
            <p><strong>Processing Time:</strong> {visa.processingTime}</p>
            <p><strong>Fee:</strong> ${visa.fee}</p>
            <p><strong>Validity:</strong> {visa.validity}</p>
            <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
            <Link to={`/visa/${visa._id}`}>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-blue-800">See Details</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/all">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-800">See All Visas</button>
        </Link>
      </div>
    </section>
  );
};

export default LatestVisa;
