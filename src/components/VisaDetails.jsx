import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import useTheme from "../hooks/UseTheme";

const VisaDetails = () => {
  const visa = useLoaderData();
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (!visa) return <Loading />;

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

  const isDark = theme === "dark";

  return (
    <div className={`max-w-5xl mx-auto px-6 py-10 transition-colors duration-300 ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
      <img src={visa.countryImage} alt={visa.countryName} className="w-full h-64 object-cover rounded-lg shadow-md" />

      <h2 className={`text-4xl font-extrabold mt-6 mb-2 ${isDark ? "text-blue-400" : "text-blue-700"}`}>
        {visa.countryName} Visa
      </h2>

      <p className={`text-base leading-relaxed mb-6 ${isDark ? "text-white/90" : "text-gray-700"}`}>
        {visa.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
        <p><span className="font-semibold">Visa Type:</span> {visa.visaType}</p>
        <p><span className="font-semibold">Processing Time:</span> {visa.processingTime}</p>
        <p><span className="font-semibold">Fee:</span> ${visa.fee}</p>
        <p><span className="font-semibold">Validity:</span> {visa.validity}</p>
        <p><span className="font-semibold">Application Method:</span> {visa.applicationMethod}</p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-800 transition-colors"
      >
        Apply for Visa
      </button>

      {showModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition">
          <div className={`p-6 rounded-xl shadow-2xl w-full max-w-lg transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-6 text-center">Apply for {visa.countryName} Visa</h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className={`w-full p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700" : "border-gray-300"}`}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className={`w-full p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700" : "border-gray-300"}`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Applied Date</label>
                <input
                  type="text"
                  value={new Date().toISOString().split("T")[0]}
                  disabled
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Visa Fee</label>
                <input
                  type="text"
                  value={`$${visa.fee}`}
                  disabled
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Submit Application
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
