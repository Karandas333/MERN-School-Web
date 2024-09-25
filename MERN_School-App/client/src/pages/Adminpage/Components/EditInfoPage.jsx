const EditStaff = ({ handelDeleteStaff, data, handelToggle }) => {
  const dateFormater = (date) => {
    const [day, month, year] = date.split('-');
  const formattedDate = new Date(`${year}-${month}-${day}`);
  // Extract day, month, year from the Date object
  const formattedDay = String(formattedDate.getDate()).padStart(2, '0'); // Ensures 2 digits for day
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const formattedYear = formattedDate.getFullYear();

  // Join them to form the desired format: dd-mm-yyyy
  return (`${formattedDay}-${formattedMonth}-${formattedYear}`)
  }
  return (
    <div className="w-[90%] h-full overflow-y-auto relative">
      <table className="w-full md:w-[90%] mt-5 h-12 ">
        <thead className="sticky top-0 bg-white w-full z-10">
          <tr>
            <td className="lg:text-xl font-semibold">Photo</td>
            <td className="lg:text-xl font-semibold">Full Name</td>
            <td className="lg:text-xl font-semibold">Post</td>
            <td className="lg:text-xl font-semibold">Subject</td>
            <td className="lg:text-xl font-semibold">Join Date</td>
            <td className="lg:text-xl font-semibold" colSpan={2}>
              Edit & Delete
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((dataObj, index) => (
            <tr key={index}>
              <td>
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${dataObj.image}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </td>
              <td className="lg:text-lg">{dataObj.fullName}</td>
              <td className="lg:text-lg">{dataObj.post}</td>
              <td className="lg:text-lg">{dataObj.subject}</td>
              <td className="lg:text-lg">{dateFormater(dataObj.joinDate)}</td>
              <td className="lg:text-lg">
                <button
                  className="lg:w-28 w-15 h-12 bg-blue-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-blue-500"
                  onClick={() => handelToggle(dataObj)} // Pass the selected staff data to handelToggle
                >
                  Edit
                </button>
              </td>
              <td className="text-lg">
                <button
                  onClick={()=>handelDeleteStaff(dataObj._id)}
                  className="lg:w-28 w-15 h-12 bg-red-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditStaff;
