import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useLoaderData } from "react-router-dom";


const MyAddedVisas = () => {
    const loadedVisa = useLoaderData();
    const {_id,countryImage, countryName,email, visaType} = loadedVisa;
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(loadedVisa);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/all/email/${user.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
    console.log(visa)
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
    console.log(selectedVisa)
    // const countryName = e.target.countryName.value;

    // const newVisa = {countryName};
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
    return <p className="text-center text-gray-500">Loading visas...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Added Visas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.length > 0 ? (
          visas.map((visa) => (
            <div key={visa._id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={visa.countryImage || ""} alt={visa.countryName} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-bold mt-3">{visa.countryName}</h3>
              <p><strong>Visa Type:</strong> {visa.visaType}</p>
              <p><strong>Processing Time:</strong> {visa.processingTime}</p>
              <p><strong>Fee:</strong> ${visa.fee}</p>
              <p><strong>Validity:</strong> {visa.validity}</p>
              <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openModal(visa)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                <button onClick={() => handleDelete(visa._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have not added any visas yet.</p>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="updateModal" className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Visa</h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input type="text" name="countryName" value={formData.countryName} onChange={handleChange} className="border p-2 w-full" placeholder="Country" required />
          <input type="text" name="countryImage" value={formData.countryImage} onChange={handleChange} className="border p-2 w-full" placeholder="Image URL" required />
          <input type="text" name="visaType" value={formData.visaType} onChange={handleChange} className="border p-2 w-full" placeholder="Visa Type" required />
          <input type="text" name="processingTime" value={formData.processingTime} onChange={handleChange} className="border p-2 w-full" placeholder="Processing Time" required />
          <input type="number" name="fee" value={formData.fee} onChange={handleChange} className="border p-2 w-full" placeholder="Fee" required />
          <input type="text" name="validity" value={formData.validity} onChange={handleChange} className="border p-2 w-full" placeholder="Validity" required />
          <input type="text" name="applicationMethod" value={formData.applicationMethod} onChange={handleChange} className="border p-2 w-full" placeholder="Application Method" required />
          <div className="flex gap-2 mt-3">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
            <button type="button" onClick={() => document.getElementById("updateModal").close()} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyAddedVisas;
