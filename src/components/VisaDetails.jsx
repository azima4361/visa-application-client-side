import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import useTheme from "../hooks/UseTheme";

const VisaDetails = () => {
  const visa = useLoaderData(); 
  const {theme}= useTheme();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (!visa) return <Loading></Loading>;

  const handleApply = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "You must be logged in to apply.", "error");
      return;
    }

    const form = e.target;
    const applicationData = {
      email: user.email,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      appliedDate: new Date().toISOString().split("T")[0], 
      fee: visa.fee,
      visaId: visa._id,
      country: visa.countryName, 
      countryImage: visa.countryImage, 
      visaType: visa.visaType, 
      processingTime: visa.processingTime, 
      validity: visa.validity, 
      applicationMethod: visa.applicationMethod,
      status: "Pending", 
    };

    fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then(() => {
        setShowModal(false);
        Swal.fire("Success!", "Your visa application has been submitted.", "success");
      })
      .catch((err) => console.error("Error submitting application:", err));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img src={visa.countryImage} alt={visa.countryName} className="w-full h-60 object-cover rounded-md" />
      <h2 className="text-3xl font-bold mt-4">{visa.countryName}</h2>
      <p className={`text-lg mt-2 ${theme ==="dark" ? " text-white" : "text-gray-600 "}`}>{visa.description}</p>
      <div className="mt-4 space-y-2">
        <p><strong>Visa Type:</strong> {visa.visaType}</p>
        <p><strong>Processing Time:</strong> {visa.processingTime}</p>
        <p><strong>Fee:</strong> ${visa.fee}</p>
        <p><strong>Validity:</strong> {visa.validity}</p>
        <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
      </div>

      <button onClick={() => setShowModal(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Apply for Visa
      </button>

      {showModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${theme === 'dark' ? "bg-black" : "bg-white"}` } >
            <h2 className="text-xl font-bold mb-10 text-center">Apply for {visa.countryName} Visa</h2>
            <form onSubmit={handleApply} className="space-y-3">
              <div>
                <label>Email</label>
                <input type="email" value={user.email} disabled className="w-full p-2 border rounded" />
              </div>
              <div className="flex gap-2">
                <div>
                  <label>First Name</label>
                  <input type="text" name="firstName" required className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" name="lastName" required className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label>Applied Date</label>
                <input type="text" value={new Date().toISOString().split("T")[0]} disabled className="w-full p-2 border rounded" />
              </div>
              <div>
                <label>Visa Fee</label>
                <input type="text" value={`$${visa.fee}`} disabled className="w-full p-2 border rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
