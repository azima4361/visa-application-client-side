import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useLoaderData } from "react-router-dom";

const MyApplication = () => {
  const loadedVisa = useLoaderData();
  // const {_id, countryImage, countryname}=loadedVisa;
  console.log(loadedVisa)
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/applications/email/${user.email}`)
        .then(res => res.json())
        .then(data => 
          // console.log(data))
          setApplications(data));
    }
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your visa application will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/applications/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            setApplications(applications.filter(app => app._id !== id));
            Swal.fire("Deleted!", "Your visa application has been removed.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Visa Applications</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={app.countryImage} alt={app.country} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-bold mt-3">{app.country}</h3>
              <p><strong>Visa Type:</strong> {app.visaType}</p>
              <p><strong>Processing Time:</strong> {app.processingTime}</p>
              <p><strong>Fee:</strong> ${app.fee}</p>
              <p><strong>Validity:</strong> {app.validity}</p>
              <p><strong>Application Method:</strong> {app.applicationMethod}</p>
              <p><strong>Applied Date:</strong> {app.appliedDate}</p>
              <p><strong>Applicant Name:</strong> {app.firstName} {app.lastName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <button
                onClick={() => handleCancel(app._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have not applied for any visas.</p>
        )}
      </div>
    </div>
  );
};
export default MyApplication;