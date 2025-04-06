
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useTheme from "../hooks/UseTheme";

const AllVisas = () => {
  
  const visas = useLoaderData();
  const {theme}= useTheme();
console.log(visas)

const [filteredVisas, setFilteredVisas] = useState(visas);
  const [selectedVisaType, setSelectedVisaType] = useState("");


  const visaTypes = [...new Set(visas.map((visa) => visa.visaType))];

  
  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setSelectedVisaType(selectedType);

    if (selectedType === "") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter((visa) => visa.visaType === selectedType);
      setFilteredVisas(filtered);
    }
  };

  return (
    <div className={`${theme ==="dark" ? "bg-black text-white" : ""} mx-auto px-4 py-8`}>
      <h2 className="text-3xl font-bold text-center mb-6">All Visas</h2>
      
 
 <div className={`flex justify-center mb-6 ${theme === 'dark' ? 'bg-black' : ""}`}>
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedVisaType}
          onChange={handleFilterChange}
        >
          <option className={`${theme === 'dark' ? 'bg-black' : ""}`} value="" >All Visa Types</option>
          {visaTypes.map((type, index) => (
            <option key={index} value={type} className={`${theme === 'dark' ? 'bg-black' : ""}`}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVisas.map((visa) => (
          <div key={visa._id} className=" shadow-md rounded-lg p-4">
            <img src={visa.countryImage} alt={visa.countryName} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-3">{visa.countryName}</h3>
            <p className={`${theme ==="dark" ? " text-white" : "text-gray-600"}`}>Type: {visa.visaType}</p>
            <p className={`${theme ==="dark" ? " text-white" : "text-gray-600"}`}>Processing Time: {visa.processingTime}</p>
            <p className={`${theme ==="dark" ? " text-white" : "text-gray-600"}`}>Fee: ${visa.fee}</p>
            <Link to={`/visa/${visa._id}`}>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVisas;
