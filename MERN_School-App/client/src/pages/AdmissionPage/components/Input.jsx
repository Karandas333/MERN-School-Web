import React from 'react'
import { Input } from "../../../components/ui/input"

const InputBox = ({ text, inputType }) => {

  function splitCamelCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  const name = splitCamelCase(text);

  return (
    <div className="col-md-6 mt-md-0 mt-3">
                    <label>{name}</label>
                    <Input name={text} type={`${inputType}`} className=" lg:max-w-[600px]" required />
     </div>
  )
}

export default InputBox