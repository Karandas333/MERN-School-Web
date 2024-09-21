import { apiClient } from "../../../lib/api-client";
import { GET_INFO_DATA } from "../../../utiles/contants";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const [infoData, setInfoData] = useState([]);
  useEffect( () => {
    async function fetchData() {
      try {
        let response = await apiClient.get(GET_INFO_DATA);
        setInfoData(response.data)
    } catch (error) {
      console.log(error)
    }
    }
    fetchData()
  },[])
  const InfoGenrator = () => {
    let alignDecider = false;
    return infoData.map((data) =>
      Object.keys(data).map((info) => (
        <div key={info}
          className={`flex ${alignDecider ? "md:flex-row-reverse" : "md:flex-row"
          } min-h-[50vh] w-full relative gap-3 items-center justify-between md:px-4 flex-col `}
        >
          {alignDecider = !alignDecider}
          <div className='h-full w-full overflow-hidden object-cover object-center md:w-1/2 relative'>
            <img className='h-full w-full' src={`data:image/jpeg;base64,${data[info].img}`} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col p-3 gap-3  ">
            <h3 className="text-2xl font-medium">{info}</h3>
            <p className="text-xl ">{data[info].info}</p>
          </div>
        </div>
      ))
    );
  };
  return (
    <div id="section" className="min-h-screen py-8 md:px-6 flex flex-col gap-6 w-full">
      {InfoGenrator()}
    </div>
  );
};

export default AboutUs;
