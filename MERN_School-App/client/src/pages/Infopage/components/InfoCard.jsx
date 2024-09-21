import React from "react";

const InfoCard = ({ data, dataHandler, colorData, toggleMode = false }) => {
  let cardType = "";
  let role = data.post.toLowerCase();
  if (role === "principal") {
    cardType = `card text-white bg-[${colorData.principal}] mb-3`;
  } else if (role === "vice-principal") {
    cardType = "card text-white bg-success mb-3";
  } else if (role === "lecturer") {
    cardType = "card text-white bg-warning mb-3";
  } else if (role === "ii-grade") {
    cardType = `card text-white bg-${colorData.ii_grade} mb-3`;
  } else if (role === "teacher-l-2") {
    cardType = "card text-white bg-secondary mb-3";
  } else if (role === "udc") {
    cardType = `card text-white bg-${colorData.udc} mb-3`;
  } else if (role === "b.c.i.") {
    cardType = "card bg-light mb-3";
  } else if (role === "p.t.i.") {
    cardType = `card bg-[${colorData.p_t_i}] text-white mb-3`;
  } else if (role === "p-teacher") {
    cardType = "card bg-[#FF8225] text-white mb-3";
  } else if (role === "v.sahayak") {
    cardType = "card bg-[#E68369] text-white mb-3";
  } else {
    cardType = "card bg-[#000] text-white mb-3";
  }
  const [day, month, year] = data.joinDate.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}`);
  // Extract day, month, year from the Date object
  const formattedDay = String(formattedDate.getDate()).padStart(2, "0"); // Ensures 2 digits for day
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const formattedYear = formattedDate.getFullYear();

  // Join them to form the desired format: dd-mm-yyyy
  const displayDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
  return (
    <>
      <div
        onClick={() => dataHandler(data)}
        className={`${cardType} w-full sm:w-[48%] lg:w-full ${
          toggleMode && "lg:max-w-[50vw]"
        }`}
      >
        <div className="card-header border-b-2 border-white text-xl font-semibold ">
          Post : {role.toUpperCase()}
        </div>
        <div className="card-body">
          <h5 className="max-w-[100px] h-[100px] rounded-lg mb-3 overflow-hidden object-cover object-center">
            <img
              src={`data:image/jpeg;base64,${data.image}`}
              className="object-cover object-center w-full h-full"
            />
          </h5>
          <h5 className={`${data.fullName === "" && "hidden"} card-title`}>
            <span
              className="font-semibold"
            >
              FullName
            </span>{" "}
            : {data.fullName}
          </h5>
          <h5 className={`${data.subject === "" && "hidden"} card-title`}>
            <span className="font-semibold">Subject</span> : {data.subject}
          </h5>
          <h5 className={`${data.joinDate === "" && "hidden"} card-title`}>
            <span className="font-semibold">Joining Date</span> : {displayDate}
          </h5>
          <p className={`${data.dicsribesition === "" && "hidden"} text-sm w-full overflow-hidden`}>
            <span className="font-semibold">Discribesition</span> :{" "}
            {data.dicsribesition}
          </p>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
