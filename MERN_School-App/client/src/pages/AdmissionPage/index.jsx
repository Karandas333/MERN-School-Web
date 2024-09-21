import { useEffect, useState } from "react";
import InputBox from "./components/Input";
import { apiClient } from "../../lib/api-client";
import { GET_INPUT_FIELDS, SUBMITING_FOR_ADMISSION } from "../../utiles/contants";
import { Form } from "react-router-dom";

const AdmissionPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchInputFields() {
      try {
        const response = await apiClient.get(GET_INPUT_FIELDS);
        if (response.status = 200) {
          setData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchInputFields()
  },[])
  const InputfieldsGenrator = () => {

      return data.map((element, index) => (
          <div className="row lg:mt-6" key={index}>
            {Object.keys(element).map((key) => (
              <InputBox key={key} text={key} inputType={element[key]} />
            ))}
          </div>
      ));
    
  };

  const handelAddmissionData = async (e) => {
    try {
    let collectedData = {}
    data.map((element, index) => (
      Object.keys(element).map((key) =>
              collectedData[key] = e.target[key].value
            )
    ));
      const response = await apiClient.post(SUBMITING_FOR_ADMISSION, {data:collectedData});
      if (response.status === 200) {
        data.map((element, index) => (
      Object.keys(element).map((key) =>
               e.target[key].value = ''
            )
    ));
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="w-full  flex flex-col mt-10 px-6 ">
      <div className="h3">Registration Form</div>

      <Form onSubmit={handelAddmissionData} className="form">
        {InputfieldsGenrator()}
        <button
            type="submit"
            className="sm:w-36 mt-5 w-full h-12 bg-blue-400 text-white  text-16 px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
      </Form>
    </div>
  );
};

export default AdmissionPage;
