import { useEffect, useState } from "react";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";
import { apiClient } from "../../../../lib/api-client";
import { CREATE_STAFF, DELETE_STAFF, EDIT_STAFF, GET_STAFF, LOAD_STAFF } from "../../../../utiles/contants";

const EditStaffMembers = () => {
  const [toggleStaffPage, setToggleStaffPage] = useState(false);
  const [dataarr, setDataarr] = useState([]);
  const [loadStaffData, setLoadStaffData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(GET_STAFF);
        if (response.status === 200) {
          setDataarr(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handlePostingStaffData = async (event, fullName, subject, post, joinDate, dicsribesition) => {
    event.preventDefault(); // Prevent form submission

    try {
      const formData = new FormData();
      formData.append("uploadPhoto", event.target.uploadPhoto.files[0]); // Add the file
      formData.append("fullName", fullName);
      formData.append("subject", subject);
      formData.append("post", post);
      formData.append("joinDate", joinDate);
      formData.append("dicsribesition", dicsribesition);

      let response = await apiClient.post(CREATE_STAFF, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      },);
      if (response.status === 200) {
        setDataarr(response.data)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Modified to load staff data and toggle to the AddStaff page
  const handelEditToggle = (staffObj = null) => {
    setToggleStaffPage(!toggleStaffPage);
    if (staffObj !== null) {
      setLoadStaffData(staffObj);
    } // Set the selected staff data for editing
  };

  const handelEdit = async (event,image, fullName, subject, post, joinDate, dicsribesition,staffId) => {
    event.preventDefault(); // Prevent form submission

    try {
      const formData = new FormData();
      formData.append("uploadPhoto", event.target.uploadPhoto.files[0]); // Add the file
      formData.append("fullName", fullName);
      formData.append("subject", subject);
      formData.append("post", post);
      formData.append("joinDate", joinDate);
      formData.append("dicsribesition", dicsribesition);
      formData.append("_id", staffId);
      
      if (event.target.uploadPhoto.files[0] === undefined) {
        formData.append("image", image);
      }

      let response = await apiClient.post(EDIT_STAFF, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },withCredentials:true,
      });
      if (response.status === 200) {
        setDataarr(response.data)
        setLoadStaffData(null);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handelDeleteStaff = async (staffId) => {
    try {
      const response = await apiClient.post(DELETE_STAFF, { _id: staffId },{withCredentials:true});
      if (response.status === 200) {
        setDataarr(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[100vw] relative flex h-screen flex-col items-center">
      <div className="w-full h-[20%]  flex items-center justify-center">
        <div className="flex items-center justify-evenly  w-[80%] h-[50%]">
          <h2
            onClick={() => {
              setToggleStaffPage(false);
              setLoadStaffData(null); // Clear the loaded staff data when switching to AddStaff
            }}
            className={`text-lg font-semibold ${
              !toggleStaffPage && "border-b-2"
            } pb-3 w-[20%] text-center border-zinc-500`}
          >
            Add Staff
          </h2>
          <h2
            onClick={() => setToggleStaffPage(true)}
            className={`text-lg font-semibold ${
              toggleStaffPage && "border-b-2"
            } pb-3 w-[20%] text-center border-zinc-500`}
          >
            Edit Staff
          </h2>
        </div>
      </div>
      <div className="w-full h-[80%] flex justify-center">
        {!toggleStaffPage ? (
          <AddStaff handelToggle={handelEditToggle} handelEdit={handelEdit} loadStaffData={loadStaffData} handelAddStaff={handlePostingStaffData} />
        ) : (
          <EditStaff handelDeleteStaff={handelDeleteStaff} handelToggle={handelEditToggle} data={dataarr} />
        )}
      </div>
    </div>
  );
};

export default EditStaffMembers;
