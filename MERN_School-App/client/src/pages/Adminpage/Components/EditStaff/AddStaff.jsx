import { useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Form } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";


const AddStaff = ({ handelToggle, handelEdit, loadStaffData, handelAddStaff }) => {
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [post, setPost] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [dicsribesition, setDicsribesition] = useState("");

  const formatDate = (dateStr) => {
  if (!dateStr) return "";

  // Split the date string into parts (assuming the input is in dd-MM-yyyy format)
  const [day, month, year] = dateStr.split('-');

  // Add leading zeros if day or month is not two digits
  const formattedDay = day.padStart(2, '0');
  const formattedMonth = month.padStart(2, '0');

  // Return in yyyy-MM-dd format
  return `${year}-${formattedMonth}-${formattedDay}`;
};



  useEffect(() => {
    if (loadStaffData) {
      setImage(loadStaffData.image || "");
      setFullName(loadStaffData.fullName || "");
      setSubject(loadStaffData.subject || "");
      setPost(loadStaffData.post || "");
      setJoinDate(formatDate(loadStaffData.joinDate) || ""); // Format date
      setDicsribesition(loadStaffData.dicsribesition || "");
    }
  }, [loadStaffData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImage(URL.createObjectURL(file)); // Set the preview URL in state
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        loadStaffData === null 
          ? handelAddStaff(e, fullName, subject, post, joinDate, dicsribesition) 
          : handelEdit(e, image, fullName, subject, post, joinDate, dicsribesition, loadStaffData._id);
        setDicsribesition("");
        setFullName("");
        setJoinDate("");
        setSubject("");
        setImage("");
        setPost("");
        handelToggle();
      }}
      autoComplete='off'
      className="w-[80%] h-[20%] md:h-[80%] md:p-4 "
    >
      <div className="w-full h-full md:h-[150px]">
        <label
          htmlFor="uploadPhoto"
          className={`md:w-[120px] rounded-md w-20 h-20 md:h-[120px] bg-[url(${
            image &&  image 
          })] bg-center bg-cover`}
        >
          <FcAddImage className={`w-full h-full ${image && 'hidden'}`} />
          {loadStaffData === null ? null : (
            loadStaffData.image === image && <img
              src={`${loadStaffData.image ? `data:image/jpeg;base64,${image}` : image}`}
              className="w-full object-cover object-center rounded-md h-full"
            />
          )}
          <input
            onChange={handleImageChange}
            type="file"
            id="uploadPhoto"
            name="uploadPhoto"
            className="hidden"
          />
        </label>
      </div>
      <div className="flex w-full md:w-[60vw] gap-3 content-start flex-col sm:flex-row flex-wrap">
        <label className="w-full sm:w-[45%] mt-3" htmlFor="name">
          <h2 className="text-xl">Teacher Full Name</h2>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="name"
            placeholder="Enter Name"
            className="mt-2 w-full"
          />
        </label>
        <label className="w-full sm:w-[45%] mt-3" htmlFor="subject">
          <h2 className="text-xl">Teacher Subject</h2>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="subject"
            placeholder="Subject"
            className="mt-2 w-full"
          />
        </label>
        <label className="w-full sm:w-[45%] mt-3" htmlFor="post">
          <h2 className="text-xl">Teacher on Post</h2>
          <Input
            value={post}
            onChange={(e) => setPost(e.target.value)}
            id="post"
            placeholder="Post"
            className="mt-2 w-full"
          />
        </label>
        <label className="w-full sm:w-[45%] mt-3" htmlFor="join-date">
          <h2 className="text-xl">Teacher Join Date</h2>
          <Input
            value={joinDate}
            onChange={(e) =>setJoinDate(e.target.value)}
            id="join-date"
            placeholder="Join Date"
            type="date"
            className="mt-2 w-full"
          />
        </label>
        <label className="w-full sm:w-[45%] mt-3" htmlFor="dicsribesition">
          <h2 className="text-xl">Teacher Information</h2>
          <textarea
            value={dicsribesition}
            onChange={(e) => setDicsribesition(e.target.value)}
            id="dicsribesition"
            placeholder="Discribesition"
            className="border-2 p-3 resize-none rounded-md text-zinc-500 min-h-[100px] max-h-[100px] mt-2 w-full"
          />
        </label>
        <div className="w-full">
          <button
            type="submit"
            className="sm:w-36 w-full h-12 bg-green-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-green-500"
          >
            {loadStaffData !== null ? 'Edit Staff' : 'Add Staff'}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default AddStaff;
