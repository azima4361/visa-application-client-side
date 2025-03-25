import { useState } from "react";
import Swal from "sweetalert2";

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist Visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisaData({ ...visaData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setVisaData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/all", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
         },
        body: JSON.stringify(visaData),
      });

      if (response.ok) {
        Swal.fire("Success!", "Visa added successfully!", "success");
        setVisaData({
          countryImage: "",
          countryName: "",
          visaType: "Tourist Visa",
          processingTime: "",
          requiredDocuments: [],
          description: "",
          ageRestriction: "",
          fee: "",
          validity: "",
          applicationMethod: "",
        });
      }
    } catch (error) {
      console.error("Error adding visa:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Visa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input 
          type="text" 
          name="countryImage"
          value={visaData.countryImage}
          onChange={handleChange}
          placeholder="" 
          className="w-full border p-2"
          required
        />

        <input 
          type="text" 
          name="countryName"
          value={visaData.countryName}
          onChange={handleChange}
          placeholder="Country Name"
          className="w-full border p-2"
          required
        />

       
        <select 
          name="visaType" 
          value={visaData.visaType} 
          onChange={handleChange} 
          className="w-full border p-2"
        >
          <option>Tourist Visa</option>
          <option>Student Visa</option>
          <option>Official Visa</option>
        </select>

    
        <input 
          type="text" 
          name="processingTime"
          value={visaData.processingTime}
          onChange={handleChange}
          placeholder="Processing Time (e.g., 2-4 weeks)"
          className="w-full border p-2"
          required
        />

      
        <div className="space-y-2">
          <label>
            <input type="checkbox" value="Valid Passport" onChange={handleCheckboxChange} /> Valid Passport
          </label>
          <label>
            <input type="checkbox" value="Visa Application Form" onChange={handleCheckboxChange} /> Visa Application Form
          </label>
          <label>
            <input type="checkbox" value="Recent Passport Photo" onChange={handleCheckboxChange} /> Recent Passport-Sized Photograph
          </label>
        </div>

        <textarea 
          name="description"
          value={visaData.description}
          onChange={handleChange}
          placeholder="Visa Description"
          className="w-full border p-2"
          required
        />

       
        <input 
          type="number" 
          name="ageRestriction"
          value={visaData.ageRestriction}
          onChange={handleChange}
          placeholder="Age Restriction (if any)"
          className="w-full border p-2"
          required
        />

        <input 
          type="number" 
          name="fee"
          value={visaData.fee}
          onChange={handleChange}
          placeholder="Visa Fee ($)"
          className="w-full border p-2"
          required
        />

    
        <input 
          type="text" 
          name="validity"
          value={visaData.validity}
          onChange={handleChange}
          placeholder="Validity (e.g., 6 months)"
          className="w-full border p-2"
          required
        />

      
        <input 
          type="text" 
          name="applicationMethod"
          value={visaData.applicationMethod}
          onChange={handleChange}
          placeholder="Application Method (e.g., Online, In-person)"
          className="w-full border p-2"
          required
        />

      
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
