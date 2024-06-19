import Image from "next/image";
import Hero from "@/app/_components/Hero/Hero";
import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/Footer/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
