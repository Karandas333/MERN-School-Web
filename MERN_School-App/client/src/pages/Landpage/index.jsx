import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";

const LandingPage = () => {
  return <>
    <div className="w-[100w] min-h-screen scroll-smooth relative ">
      <Hero />
      <AboutUs/>
    </div>
  </>
}

export default LandingPage;