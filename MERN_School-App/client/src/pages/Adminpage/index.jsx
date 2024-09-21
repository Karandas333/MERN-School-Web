import { apiClient } from "../../lib/api-client";
import { ACTION_ADMISSIONS, FETCH_ADMISSIONS } from "../../utiles/contants";
import { useEffect, useState } from "react";
import qs from 'qs'

const AdmissionForm = ({ handelAction, admission }) => {
  const student = `${admission.data["First Name"]} ${admission.data["Last Name"]}`;

  return (
    <div className="w-full lg:max-w-[30vw] bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">{student}</h2>
      {Object.keys(admission.data).map((data) =>
        data !== admission.data["First Name"] || admission.data["Last Name"] ? (
          <p key={data}>
            <span className="capitalize">{data}</span>: {admission.data[data]}
          </p>
        ) : null
      )}
      <button
        onClick={() =>
          handelAction(admission._id, student, admission.data["Email"], "ACCEPTED")
        }
        className="bg-green-500 fond-medium text-white py-1 px-3 rounded mt-2"
      >
        Approve
      </button>
      <button
        className="bg-red-500 fond-medium text-white py-1 px-3 rounded mt-2 ml-2"
        onClick={() =>
          handelAction(admission._id, student, admission.data["Email"], "REJECTED")
        }
      >
        Reject
      </button>
    </div>
  );
};

const AdmissionList = () => {
  const [admissions, setAdmissions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(FETCH_ADMISSIONS);
      if (response.status === 200) {
        setAdmissions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelAction = async (_id, student, email, action) => {
    try {
      const response = await apiClient.post(ACTION_ADMISSIONS, qs.stringify({
        _id,
        student,
        email,
        action,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct header
        },
        withCredentials: true
      });
      if (response.status === 200) {
        // Refetch the updated list after action
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-3 w-full gap-3 flex-col lg:flex-row">
      {admissions.map((admission) => (
        <AdmissionForm
          key={admission._id}
          handelAction={handelAction}
          admission={admission}
        />
      ))}
    </div>
  );
};

const AdminDashBoard = () => {
  return (
    <div className="w-full p-8 h-screen flex-col">
      <div className="w-full flex items-center justify-center">
        <h2 className="text-3xl font-medium">Admissions List</h2>
      </div>
      <AdmissionList />
    </div>
  );
};

export default AdminDashBoard;
