import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { apiClient } from "../../../lib/api-client";
import { CREATE_INPUT_FIELDS, DELETE_INPUT_FIELDS, GET_INPUT_FIELDS, UPDATE_INPUT_FIELDS } from "../../../utiles/contants";

const CreateForm = () => {
  const [addInputName, setAddInputName] = useState("");
  const [addInputType, setAddInputType] = useState("text");
  const [data, setData] = useState([]);

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
  },[data])

  let [condition,setCondition] = useState('Add')

  function splitCamelCase(input) {
    return input.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  // Add Input Function
  const handleAddInput = async () => {
    if (addInputName && addInputType) {
      try {
        const response = await apiClient.post(CREATE_INPUT_FIELDS, { text: addInputName, type: addInputType },{withCredentials:true});
        console.log('Debugger: ',response)
        if (response.status = 200) {
          setData(response.data)
        }
      } catch (error) {
        console.log(error)
      }

      setAddInputName("");
    }
  };

  // Delete Input Function
  const handleDeleteInput = (inputName,inputType) => {
    try {
      const response = apiClient.post(DELETE_INPUT_FIELDS,{text:inputName,type:inputType},{withCredentials:true})
      if (response.status === 201) {
        setData(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  };

  // Edit Input Function
  let [editToggle, setEditToggle] = useState(false)
  const handleEditInput = (keyName, value) => {
    setEditToggle(true)
    setCondition('Save');
    setAddInputName(keyName)
    setAddInputType(value);
  };
  const handelSaveInput = () => {
    if (editToggle) {
      try {
        const response = apiClient.post(UPDATE_INPUT_FIELDS, { text: addInputName, type: addInputType },{withCredentials:true})
        if (response.status === 201) {
          setData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    setAddInputName('')
    setEditToggle(false)
    setCondition('Add')
  };

  let name = "";
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[45%] sm:h-[30%] flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold">Edit Admission Form</h1>
        <div className="w-full h-full sm:w-[600px] sm:h-[150px] flex justify-evenly sm:justify-around items-center sm:flex-row flex-col">
          <Input
            value={addInputName}
            onChange={(e) => setAddInputName(e.target.value)}
            placeholder="Enter Name"
            className="w-[80%] sm:w-1/4 border-black"
          />
          <select
            onChange={(e) => setAddInputType(e.target.value)}
            value={addInputType}
            className="w-[80%] sm:w-1/4 border-[1px] px-4 py-2 rounded-md border-black"
          >
            <option value="text" defaultChecked={true}>Text</option>
            <option value="file">File</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
          </select>
          <button
            onClick={() => {
              if (editToggle) {
                handelSaveInput()
              } else {
                handleAddInput()
              }
            }}
            className="sm:w-28 w-[80%] h-12 bg-green-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-green-500"
          >
            {condition}
          </button>
        </div>
      </div>
      <div className="w-full relative h-1/2 sm:h-[60%] flex justify-center items-center">
        <div className="w-[90%] h-full overflow-y-auto relative">
          <table className="w-full">
            <thead className="sticky top-0 bg-white w-full z-10">
              <tr>
                <th className="font-bold sm:font-medium sm:text-2xl">Text</th>
                <th className="font-bold sm:font-medium sm:text-2xl">Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, elementIndex) =>
                Object.keys(element).map((key, index) => {
                  name = splitCamelCase(key);
                  return (
                    <tr
                      className="border-b-[1px] border-zinc-300"
                      key={`${elementIndex}-${index}`}
                    >
                      <td className="sm:py-3">
                        <span className="">{name}</span>
                      </td>
                      <td className="sm:py-3">{element[key]}</td>
                      <td className="sm:py-3">
                        <button
                          className={`w-30 h-12 bg-blue-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-blue-500`}
                          onClick={() => {
                            handleEditInput(key, element[key]) 
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="sm:py-3">
                        <button
                          className={`w-30 h-12 bg-red-400 text-white mt-0 text-16 px-4 py-2 rounded-md hover:bg-red-500`}
                          onClick={() => handleDeleteInput(key,element[key])}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
