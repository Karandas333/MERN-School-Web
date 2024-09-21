import { apiClient } from "../lib/api-client";
import { ADMIN_LOGOUT } from "../utiles/contants";
import { useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = ({page}) => {

  const [toggleMenu, setToggleMenu] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    let prevElem = document.querySelector('.active');
    prevElem && (prevElem.className = prevElem.className.split('active')[0])
    document.querySelectorAll('a').forEach(elem => {
    elem.href.toString().split('http://localhost:5173')[1] === page ? elem.className += ' active' : ''
  })
  },[page])
  
  const handelLogout = async () => {
    try {
      const response = await apiClient.post(ADMIN_LOGOUT, {}, {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct header
        },
        withCredentials: true
      });
      if (response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={`block z-[999] h-10 w-full sticky top-0 left-0 bg-white px-2 py-2 text-xl lg:hidden`}>
        <RiMenu2Line onClick={()=>setToggleMenu(!toggleMenu)} />
      </div>
      <div className={`w-full z-[999] fixed lg:w-[20%] lg:h-screen h-[95vh]  left-0 bottom-0 ${toggleMenu ? 'block ' : 'hidden'} lg:relative lg:block`}>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark  w-full h-full">
    <span  className="d-flex align-items-center mb-4 relative text-white text-decoration-none">
      
      <span className="fs-4">Menu</span>
    </span>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to='/admin/dashboard' className="nav-link text-white w-full py-6" aria-current="page">
          Admission requests
        </Link>
      </li>
      
      <li>
        <Link to='/admin/edit-info-page' className="nav-link w-full py-6 text-white">
          Edit InfoPage
        </Link>
      </li>
      <li>
        <Link to='/admin/admission-form-creation' className="nav-link w-full py-6 text-white">
          Edit New Admission Form
        </Link>
      </li>
      <li>
        <Link to='/admin/edit-staff-members' className="nav-link w-full py-6 text-white">
          Edit Staff members
        </Link>
      </li>
    </ul>
    <hr />
    <div className="dropdown flex items-center justify-around pt-3">
        <span className="font-semibold">Admin</span>
      <a href="#" className="d-flex align-items-center text-white text-xl text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={()=>handelLogout()}>Logout</button></li>
      </ul>
    </div>
      </div>
      </div>
      </>
  )
}

export default AdminSidebar