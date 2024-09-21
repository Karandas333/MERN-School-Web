import { apiClient } from "@/lib/api-client";
import { VERIFY_ADMIN } from "@/utiles/contants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const tlHandel = gsap.timeline();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth status

  // Verify user authentication
  const verify = async () => {
    try {
      const response = await apiClient.get(VERIFY_ADMIN, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false); // Set false in case of error
    }
  };
  verify()
  useGSAP(
    tlHandel.to(".menuList", {
      opacity: 10,
      x: -24,
      ease: 1,
      stagger: 0.1,
    })
  );

  const toggelAnimation = async (toggle) => {
    tlHandel.pause();
    toggle ? tlHandel.play() : await tlHandel.reverse();

    setToggleMenu(!toggleMenu);
  };

  window.addEventListener("scroll", () => {
    var header = document.querySelector(".navigation");
    header.classList.toggle("navig", window.scrollY > 0);
  });

  return (
    <div className="navigation w-full lg:w-[80%] md:mx-auto p-6 h-[70px] z-[8] relative top-0 left-0 flex items-center justify-between lg:justify-around">
      <h3 className="text-3xl">
        <Link to="/">School</Link>
      </h3>
      {toggleMenu ? (
        <RiCloseLine
          onClick={() => toggelAnimation(!toggleMenu)}
          className="text-2xl absolute right-4 lg:hidden"
        />
      ) : (
        <CiMenuFries
          onClick={() => toggelAnimation()}
          className="text-2xl absolute right-4 lg:hidden"
        />
      )}
      <ul
        className={` menuContainer ${
          toggleMenu === false
            ? "hidden absolute gap-4 right-6 top-12"
            : "flex flex-col absolute gap-4 right-0  top-12"
        } lg:mx-auto lg:top-0 sm:w-[100%] bg-white/90 lg:bg-transparent overflow-hidden pl-5 py-6 lg:w-1/2 lg:content-center w-2/4 lg:p-0 lg:relative lg:flex lg:justify-evenly lg:flex-row lg:items-center lg:gap-6 `}
      >
        <Link to="/admission">
          <li className="menuList whitespace-nowrap hover:border-solid  opacity-[0.1] lg:opacity-100    relative lg:border-none text-right lg:border-b-2 lg:border-[#66CCCC]">
            Admission
          </li>
        </Link>
        <Link to="/info">
          <li className="menuList whitespace-nowrap hover:border-solid  opacity-[0.1] lg:opacity-100    relative lg:border-none text-right lg:border-b-2 lg:border-[#66CCCC]">
            Information
          </li>
        </Link>
        <Link to="/contact-us">
          <li className="menuList whitespace-nowrap hover:border-solid  opacity-[0.1] lg:opacity-100    relative lg:border-none text-right lg:border-b-2 lg:border-[#66CCCC]">
            Contact Us
          </li>
        </Link>
        {
          isAuthenticated ? <Link to="/admin/govt-sr-sec-school-ss">
          <li className="menuList whitespace-nowrap hover:border-solid  opacity-[0.1] lg:opacity-100 relative lg:border-none text-right lg:border-b-2 lg:border-[#66CCCC]">
            Admin Dashboard
          </li>
        </Link> : null
        }
      </ul>
    </div>
  );
};

export default Header;
