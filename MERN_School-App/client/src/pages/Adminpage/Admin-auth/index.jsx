import { useState } from "react";
import { apiClient } from "../../../lib/api-client";
import { ADMIN_LOGIN } from "../../../utiles/contants";
import { useNavigate } from "react-router-dom";
import qs from 'qs';

const AdminAuth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
    const response = await apiClient.post(
      ADMIN_LOGIN,
      qs.stringify({ email, password }), // URL-encoded form
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct header
        },
        withCredentials: true, // To allow cookies
      }
    );
    if (response.status === 200) {
      aleart(response.data)
      localStorage.setItem('jwt',response.data.token)
      navigate('/admin/dashboard');
    }
  } catch (error) {
    console.log(error.message);
  }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`w-full lg:w-2/6 px-6 py-4 relative top-10 lg:top-20  h-[50vh] `}
      >
        <h3 className="mb-3 text-3xl">Admin Login</h3>
        <div className="row g-3 needs-validation">
          <div className="form-floating mb-3">
            <input
              value={email}
              onChange={e=>setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              value={password}
              onChange={e=>setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="col-12">
            <button
              onClick={() => handelLogin()}
              className="bg-blue-500 hover:bg-blue-600 fond-medium text-white py-1 px-3 rounded mt-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
