import { CONTACTUS } from "../../utiles/contants"
import { apiClient } from "../../lib/api-client"
import { useState } from "react"

const ContactUsPage = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handelSend = async () => {
    try {
      const response = await apiClient.post(CONTACTUS, { firstName, lastName, phoneNumber, email, message })
      if (response.status === 200) {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setEmail('')
        setMessage('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`w-full lg:w-full px-6 py-4 relative top-10  h-[50vh]`}>
      <h3 className="mb-1 text-2xl lg:text-3xl">Contact Us</h3>
      <h3 className="mb-3 text-md lg:text-xl">Fill up your details</h3>

      <div className="row g-3 needs-validation">
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
            <input
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
            type="text"
            className="form-control"
            id="validationCustom01"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
            type="text"
            className="form-control"
            id="validationCustom02"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="form-floating mb-3">
          <input
              value={phoneNumber}
              onChange={e=>setPhoneNumber(e.target.value)}
            type="text"
            className="form-control"
              id="floatingInput"
              maxLength={10}
              placeholder="0123456789"
              required
          />
          <label htmlFor="floatingInput">Phone Number</label>
          </div>
        <div className="form-floating mb-3">
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="floatingInput"
              placeholder="name@example.com"
              required
          />
          <label htmlFor="floatingInput">Email address</label>
          </div>
          
        <div className="form-floating">
            <textarea
              value={message}
              onChange={e=>setMessage(e.target.value)}
              className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
            <label htmlFor="floatingTextarea2"
            required>Comments</label>
          </div>
          
        <div className="col-12">
            <button
              onClick={handelSend}
            className="sm:w-36 mt-5 w-full h-12 bg-blue-400 text-white  text-16 px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ContactUsPage