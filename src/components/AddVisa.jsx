import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../hooks/UseTheme";

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [visaData, setVisaData] = useState({
    email: user?.email || "",
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
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to add a visa!", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...visaData, email: user.email }),
      });

      if (response.ok) {
        Swal.fire("Success!", "Visa added successfully!", "success");
        setVisaData({
          email: user.email,
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
    <div
      className={`max-w-3xl mx-auto p-8 rounded-xl shadow-lg ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">Add Visa</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Country Image URL</label>
            <input
              type="text"
              name="countryImage"
              value={visaData.countryImage}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Country Name</label>
            <input
              type="text"
              name="countryName"
              value={visaData.countryName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        </div>

       
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Visa Type</label>
            <select
              name="visaType"
              value={visaData.visaType}
              onChange={handleChange}
              className={`w-full border p-2 rounded-md ${theme === "dark" ? "bg-black" : "bg-white"}`}
            >
              <option>Tourist Visa</option>
              <option>Student Visa</option>
              <option>Official Visa</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Processing Time</label>
            <input
              type="text"
              name="processingTime"
              value={visaData.processingTime}
              onChange={handleChange}
              placeholder="e.g., 2-4 weeks"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        </div>

        
        <div>
          <label className="block mb-2 font-medium">Required Documents</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Valid Passport", "Visa Application Form", "Recent Passport Photo"].map((doc, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={doc}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
                {doc}
              </label>
            ))}
          </div>
        </div>

      
        <div>
          <label className="block mb-1 font-medium">Visa Description</label>
          <textarea
            name="description"
            value={visaData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            rows="4"
            required
          />
        </div>

        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Age Restriction</label>
            <input
              type="number"
              name="ageRestriction"
              value={visaData.ageRestriction}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Visa Fee ($)</label>
            <input
              type="number"
              name="fee"
              value={visaData.fee}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Validity</label>
            <input
              type="text"
              name="validity"
              value={visaData.validity}
              onChange={handleChange}
              placeholder="e.g., 6 months"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Application Method</label>
            <input
              type="text"
              name="applicationMethod"
              value={visaData.applicationMethod}
              onChange={handleChange}
              placeholder="e.g., Online, In-person"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        </div>

      
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit Visa Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisa;
