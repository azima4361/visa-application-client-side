import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useLoaderData } from "react-router-dom";
import Loading from "./Loading";
import useTheme from '../hooks/UseTheme';

const MyAddedVisas = () => {
  const loadedVisa = useLoaderData();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(loadedVisa);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/all/email/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setVisas(data);
          setLoading(false);
        });
    }
  }, [user]);

  // Handle Delete Visa
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This visa record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/all/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            setVisas(visas.filter(visa => visa._id !== id));
            Swal.fire("Deleted!", "Your visa record has been removed.", "success");
          });
      }
    });
  };

  // Handle Open Modal
  const openModal = (visa) => {
    setSelectedVisa(visa);
    setFormData(visa);
    document.getElementById("updateModal").showModal();
  };

  // Handle Input Change in Modal
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Update Visa
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/all/${selectedVisa._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update visa");
        return res.json();
      })
      .then(() => {
        setVisas(visas.map(visa => (visa._id === selectedVisa._id ? formData : visa)));
        document.getElementById("updateModal").close();
        Swal.fire("Updated!", "Your visa information has been updated.", "success");
      })
      .catch(err => {
        console.error("Update Error:", err);
        Swal.fire("Error", "Failed to update visa", "error");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-700'}`}>My Added Visas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.length > 0 ? (
          visas.map((visa) => (
            <div key={visa._id} className={`shadow-lg rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <img src={visa.countryImage || ""} alt={visa.countryName} className="w-full h-40 object-cover rounded-md" />
              <h3 className={`text-xl font-bold mt-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-700'}`}>{visa.countryName}</h3>
              <p><strong>Visa Type:</strong> {visa.visaType}</p>
              <p><strong>Processing Time:</strong> {visa.processingTime}</p>
              <p><strong>Fee:</strong> ${visa.fee}</p>
              <p><strong>Validity:</strong> {visa.validity}</p>
              <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openModal(visa)} className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer`}>Update</button>
                <button onClick={() => handleDelete(visa._id)} className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer`}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-300' : ''}`}>You have not added any visas yet.</p>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="updateModal" className={` p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-700'}`}>Update Visa</h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input type="text" name="countryName" value={formData.countryName} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Country" required />
          <input type="text" name="countryImage" value={formData.countryImage} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Image URL" required />
          <input type="text" name="visaType" value={formData.visaType} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Visa Type" required />
          <input type="text" name="processingTime" value={formData.processingTime} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Processing Time" required />
          <input type="number" name="fee" value={formData.fee} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Fee" required />
          <input type="text" name="validity" value={formData.validity} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Validity" required />
          <input type="text" name="applicationMethod" value={formData.applicationMethod} onChange={handleChange} className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} placeholder="Application Method" required />
          <div className="flex gap-2 mt-3">
            <button type="submit" className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer`}>Save</button>
            <button type="button" onClick={() => document.getElementById("updateModal").close()} className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition cursor-pointer`}>Cancel</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyAddedVisas;
