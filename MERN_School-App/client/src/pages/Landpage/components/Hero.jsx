
import { FaArrowRight } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className="hero h-screen w-full  sm:bg-[url('https://www.pacificoaks.edu/voicesadmin/2021/09/PO-outdoor-education.jpg')] bg-[url('https://i.pinimg.com/564x/81/d4/13/81d41339d4d362c81799803ec581b370.jpg')] bg-bottom sm:bg-center  bg-no-repeat bg-cover">
        <div className="w-full h-full flex items-center bg-black/20 backdrop-blur-sm justify-center flex-col gap-5">
          <h1 className="tracking-tighter text-center text-6xl text-white text-wrap ">
            Welcome to our  <span className="text-yellow-400">School</span> Website</h1>
        <a href="#section" className=" w-46 h-16 bg-yellow-500 text-white text-xl px-4 py-2 rounded-md hover:bg-yellow-600 flex gap-2 items-center justify-center">Explore more <FaArrowRight /></a>

        </div>
      </div>
  )
}

export default Hero