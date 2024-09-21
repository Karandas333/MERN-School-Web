import { useEffect, useState } from "react";
import InfoCard from "./components/InfoCard"
import { IoCloseSharp } from "react-icons/io5";
import { GET_STAFF } from "../../utiles/contants";
import { apiClient } from "../../lib/api-client";

const InfoPage = () => {
  const colorData = {
    principal: '#E6B9A6',
    ii_grade: 'info',
    udc: 'danger',
    p_t_i: '#478CCF',
  }
  let [dataArr, setDataArr] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(GET_STAFF);
        if (response.status === 200) {
          setDataArr(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const [toggleInfoCard, setToggleInfoCard] = useState(false)
  const [data, setData] = useState({})
  const dataHandler = (data) => {
    if (data) {
      setToggleInfoCard(true)
      setData(data)
    } else {
      setToggleInfoCard(false)
      setData({})
    }
  }

  return (
    <>
      {
        toggleInfoCard ? <div className=' w-full h-screen bg-zinc-900/80 z-[9] top-0 left-0 fixed  flex items-center justify-center '>
        <IoCloseSharp onClick={()=>setToggleInfoCard(null)} className="text-3xl text-white fixed top-3 right-3" />
        <InfoCard colorData={colorData} toggleMode={true} data={data} />
        </div>
          :
          null
      }
    <div className="flex flex-wrap w-full  relative sm:gap-x-6 lg:grid lg:gap-y-3 lg:gap-x-3 lg:grid-cols-3  mt-6 px-6 ">
      {dataArr.map((teachersData)=><InfoCard colorData={colorData} dataHandler={dataHandler}  key={teachersData.joinDate} data={teachersData} />)}
    </div>
    </>
  )
}

export default InfoPage