import { Divider } from "@chakra-ui/react"
import type { NextPage } from "next"
import About from "../components/home/about"
import Footer from "../components/home/footer"
import HeroSection from "../components/home/hero-section"
import HowToUse from "../components/home/how-to-use"
import Navbar from "../components/navbar"

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Divider />
      <HowToUse />
      <Divider />
      <About />
      <Footer />
    </>
  )
}

export default Home
